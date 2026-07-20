import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('Dirty drain via stream backpressure with in-flight writes', () => {
  it('should emit drain when stream drains and inFlightWrites reaches zero', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-bp-${process.pid}-${Date.now()}.db`);

    // Dynamically import to get fresh instance
    import('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js').then((module) => {
      const Dirty = module.default || module;
      const db = new Dirty(dbPath);

      db.on('load', () => {
        // Patch _flush to intercept the write and simulate backpressure
        // by making write() return false, then manually emitting drain later
        const ws = db._writeStream;

        // Save original write
        const origWrite = ws.write.bind(ws);
        let writeCount = 0;
        let forcedBackpressure = false;
        let pendingCallbacks: Function[] = [];

        // Override write to capture callbacks and simulate backpressure
        (ws as any).write = function(data: any, cb: any) {
          writeCount++;
          // Store the callback to call later
          pendingCallbacks.push(cb);
          // Simulate backpressure on first write
          if (writeCount === 1) {
            forcedBackpressure = true;
            // Schedule actual write but return false to signal backpressure
            origWrite(data, cb);
            return false;
          }
          return origWrite(data, cb);
        };

        const timeout = setTimeout(() => {
          try { fs.unlinkSync(dbPath); } catch {}
          done(new Error('drain event never fired'));
        }, 3000);

        db.once('drain', () => {
          clearTimeout(timeout);
          try { fs.unlinkSync(dbPath); } catch {}
          done();
        });

        // Single set - should trigger backpressure path
        db.set('key1', { value: 'hello world' });
      });
    });
  });
});