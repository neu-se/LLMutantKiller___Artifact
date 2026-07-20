import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush backpressure mutation', () => {
  it('should emit drain after writing keys when stream write returns false', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const cleanup = (err?: unknown) => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      if (err) done(err); else done();
    };

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Patch the write stream to return false on first write (simulating backpressure)
      // and then emit 'drain' after a tick (as a real stream would)
      const ws = (db as any)._writeStream;
      const originalWrite = ws.write.bind(ws);
      let intercepted = false;

      ws.write = function(data: string, cb: Function) {
        if (!intercepted) {
          intercepted = true;
          // Call original to actually write, but return false to signal backpressure
          originalWrite(data, cb);
          // Manually emit drain on the write stream after a tick to simulate real backpressure
          setImmediate(() => ws.emit('drain'));
          return false;
        }
        return originalWrite(data, cb);
      };

      const callbacks: string[] = [];

      db.set('key1', 'value1', () => callbacks.push('key1'));
      db.set('key2', 'value2', () => callbacks.push('key2'));
      db.set('key3', 'value3', () => callbacks.push('key3'));

      db.once('drain', () => {
        try {
          // All three callbacks must have fired
          expect(callbacks).toContain('key1');
          expect(callbacks).toContain('key2');
          expect(callbacks).toContain('key3');
          expect(callbacks.length).toBe(3);
          cleanup();
        } catch (e) {
          cleanup(e);
        }
      });
    });

    db.on('error', cleanup);
  }, 10000);
});