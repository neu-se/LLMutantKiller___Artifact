import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('close() calls destroy in end callback', () => {
  it('stream is destroyed synchronously within end callback in original', (done) => {
    const file = path.join(os.tmpdir(), `dirty-sync-${process.pid}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', () => {
      const ws = db._writeStream;
      
      // Intercept end() to check destroyed state after callback runs
      const origEnd = ws.end.bind(ws);
      ws.end = function(cb: any) {
        return origEnd(function() {
          // cb() is either () => this._writeStream.destroy() or () => undefined
          if (cb) cb();
          // After cb runs: in original, destroy() was called synchronously
          // so ws.destroyed should be true
          // In mutated, cb() is a no-op, so ws.destroyed depends on autoClose timing
          const destroyedSync = ws.destroyed;
          
          setImmediate(() => {
            try { fs.unlinkSync(file); } catch(e) {}
            expect(destroyedSync).toBe(true);
            done();
          });
        });
      };

      db.set('k', 'v');
      db.on('drain', () => db.close());
    });
  });
});