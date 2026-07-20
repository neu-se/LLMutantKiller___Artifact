import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should correctly persist all queued items to disk even when backpressure occurs', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-bp-persist-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const N = 200;
    // Large values to reliably trigger backpressure (each ~100 bytes, total ~20KB > 16KB highWaterMark)
    const VALUE = 'x'.repeat(100);
    let callbackCount = 0;

    db.on('load', () => {
      for (let i = 0; i < N; i++) {
        db.set(`key${i}`, VALUE + i, () => {
          callbackCount++;
        });
      }

      db.once('drain', () => {
        // All callbacks must have fired before drain
        expect(callbackCount).toBe(N);

        // Reload and verify all data persisted correctly
        const db2 = new Dirty(file);
        db2.on('load', (size: number) => {
          expect(size).toBe(N);
          for (let i = 0; i < N; i++) {
            expect(db2.get(`key${i}`)).toBe(VALUE + i);
          }

          db2.close();
          db2.on('write_close', () => {
            try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
            done();
          });
        });
        db2.on('error', done);
      });
    });

    db.on('error', done);
  });
});