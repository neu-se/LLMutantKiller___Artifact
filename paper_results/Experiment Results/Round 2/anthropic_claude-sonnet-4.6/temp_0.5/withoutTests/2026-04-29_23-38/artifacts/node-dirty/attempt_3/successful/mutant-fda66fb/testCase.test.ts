import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty', () => {
  it('should persist all written values to disk even when backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const totalWrites = 300;
      let callbacksReceived = 0;

      const onCallback = () => {
        callbacksReceived++;
        if (callbacksReceived === totalWrites) {
          // All callbacks fired - now close and reopen to verify persistence
          db.close();
          db.once('write_close', () => {
            // Reopen and verify all data was persisted
            const db2 = new Dirty(dbPath);
            db2.on('load', (count: number) => {
              try {
                expect(count).toBe(totalWrites);
                fs.rmSync(tmpDir, { recursive: true, force: true });
                done();
              } catch (e) {
                fs.rmSync(tmpDir, { recursive: true, force: true });
                done(e);
              }
            });
            db2.on('error', (err: Error) => {
              fs.rmSync(tmpDir, { recursive: true, force: true });
              done(err);
            });
          });
        }
      };

      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { data: 'x'.repeat(16000) }, onCallback);
      }
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 20000);
});