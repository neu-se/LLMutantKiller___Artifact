import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure handling', () => {
  it('should persist all items correctly when reloading after drain', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-reload-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const N = 200;
    const VALUE = 'x'.repeat(100);

    db.on('load', () => {
      for (let i = 0; i < N; i++) {
        db.set(`key${i}`, VALUE + i);
      }

      db.close();
      db.on('write_close', () => {
        // Reload and verify all N items persisted
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