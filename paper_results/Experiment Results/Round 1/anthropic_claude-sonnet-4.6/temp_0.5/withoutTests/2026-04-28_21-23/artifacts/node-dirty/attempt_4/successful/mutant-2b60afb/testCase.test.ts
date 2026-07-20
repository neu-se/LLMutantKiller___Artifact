import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { EventEmitter } from 'events';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event mutation detection', () => {
  it('should emit drain after write stream drain event when queue is empty', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mut-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.on('error', (err: Error) => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
        done(err);
      });

      const ws = (db as any)._writeStream;

      // Intercept write: capture the callback, return false (backpressure)
      // Then manually fire the callback and then the stream drain event
      let capturedCallback: ((err?: Error | null) => void) | null = null;
      const originalWrite = ws.write.bind(ws);

      ws.write = function(data: string, cb: (err?: Error | null) => void) {
        // Store callback, signal backpressure
        capturedCallback = cb;
        // Actually write the data so the file is valid, but return false
        const result = originalWrite(data, (err: Error | null) => {
          // Don't call cb yet - we'll call it manually after
        });
        // Schedule: call the write callback first (with _waitForDrain still true),
        // then emit the stream drain event
        setImmediate(() => {
          // At this point _waitForDrain is true, so write callback won't emit drain
          if (capturedCallback) capturedCallback(null);
          // Now emit stream drain - this is where original emits 'drain', mutant doesn't
          setImmediate(() => {
            ws.emit('drain');
          });
        });
        return false; // signal backpressure
      };

      db.once('drain', () => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
        done();
      });

      db.set('testKey', 'testValue');
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 10000);
});