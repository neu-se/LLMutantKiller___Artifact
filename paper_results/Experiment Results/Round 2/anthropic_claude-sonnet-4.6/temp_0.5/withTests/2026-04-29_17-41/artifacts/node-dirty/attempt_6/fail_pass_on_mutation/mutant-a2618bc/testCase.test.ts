import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should write all items to disk and reload correctly after many sets', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-many-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const N = 100;
    // Use values large enough that total exceeds 16KB highWaterMark
    // but small enough that individual writes don't each exceed it
    const VALUE = 'x'.repeat(200);
    let remaining = N;

    db.on('load', () => {
      for (let i = 0; i < N; i++) {
        db.set(`key${i}`, VALUE, () => {
          remaining--;
          if (remaining === 0) {
            // All callbacks fired - now close and reload to verify persistence
            db.close();
          }
        });
      }

      db.on('write_close', () => {
        const db2 = new Dirty(file);
        db2.on('load', (size: number) => {
          // With mutation: _waitForDrain may be incorrectly managed,
          // potentially causing some writes to be lost or duplicated
          expect(size).toBe(N);
          for (let i = 0; i < N; i++) {
            expect(db2.get(`key${i}`)).toBe(VALUE);
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