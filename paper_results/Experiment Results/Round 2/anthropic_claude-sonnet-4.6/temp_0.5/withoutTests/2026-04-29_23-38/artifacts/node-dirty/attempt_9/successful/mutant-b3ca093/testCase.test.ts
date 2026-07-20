import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should process remaining queue items after stream drain event, not before', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let writeCount = 0;
      const drainEmitted: boolean[] = [];

      // Make write() return false after first write to trigger backpressure
      ws.write = function(data: string, cb: Function) {
        writeCount++;
        originalWrite(data, cb);
        if (writeCount === 1) {
          // Signal backpressure - stream will emit 'drain' naturally after flush
          return false;
        }
        return true;
      };

      db.set('key1', 'value1');

      // After key1 is queued and flushed (with backpressure), 
      // set key2. Original: _flush returns early (waitForDrain=true).
      // Mutation: _flush proceeds and writes key2 immediately.
      setImmediate(() => {
        db.set('key2', 'value2');

        // With original: key2 stays in queue until stream drain fires
        // With mutation: key2 is written immediately (ignoring backpressure)
        // Check writeCount - with original it should still be 1 here
        // With mutation it would be 2
        setImmediate(() => {
          try {
            // Original: writeCount=1 (key2 waiting for drain)
            // Mutation: writeCount=2 (key2 written immediately)
            expect(writeCount).toBe(1);
            cleanup();
          } catch (e) {
            cleanup(e);
          }
        });
      });
    });

    db.on('error', cleanup);
  }, 10000);
});