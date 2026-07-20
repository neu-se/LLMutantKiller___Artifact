import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event handling', () => {
  it('should flush remaining queued items after write stream drain event', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    const cleanup = (err?: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
      if (err) done(err);
      else done();
    };

    db.on('load', () => {
      const ws = (db as any)._writeStream as fs.WriteStream;
      
      // Pause the underlying stream to build up backpressure
      ws.cork();
      
      // Manually set _waitForDrain = true to simulate backpressure state
      (db as any)._waitForDrain = true;
      
      // Directly add items to the queue (simulating what happens when _waitForDrain=true)
      const callbacks: (() => void)[] = [];
      let callbackCount = 0;
      const totalExpected = 3;
      
      const timeout = setTimeout(() => {
        cleanup(new Error(`Only ${callbackCount}/${totalExpected} callbacks fired - drain handler did not call _flush()`));
      }, 3000);
      
      const makeCallback = () => () => {
        callbackCount++;
        if (callbackCount === totalExpected) {
          clearTimeout(timeout);
          db.close();
          cleanup();
        }
      };
      
      // Add items directly to queue as if they were set while _waitForDrain=true
      (db as any)._data.set('key1', 'val1');
      (db as any)._queue.set('key1', [makeCallback()]);
      
      (db as any)._data.set('key2', 'val2');
      (db as any)._queue.set('key2', [makeCallback()]);
      
      (db as any)._data.set('key3', 'val3');
      (db as any)._queue.set('key3', [makeCallback()]);
      
      // Now uncork and emit drain to trigger the drain handler
      // The drain handler should call _flush() since queue is non-empty
      ws.uncork();
      
      // Emit drain on the write stream to trigger the handler
      ws.emit('drain');
    });

    db.on('error', (err: Error) => {
      cleanup(err);
    });
  }, 5000);
});