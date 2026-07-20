import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop mutation detection', () => {
  it('should cork the write stream only once when flushing multiple queued keys', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // Wait for write stream to be ready, then spy on cork
      let corkCount = 0;
      const originalCork = db._writeStream.cork.bind(db._writeStream);
      db._writeStream.cork = () => {
        corkCount++;
        return originalCork();
      };

      let allDone = false;
      let callbacksReceived = 0;
      const NUM_KEYS = 5;

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, `val${i}`, () => {
          callbacksReceived++;
          if (callbacksReceived === NUM_KEYS && !allDone) {
            allDone = true;
            setImmediate(() => {
              try {
                // Original: all keys flushed in one cork/uncork -> corkCount = 1
                // Mutated: one key per flush, each with cork/uncork -> corkCount = NUM_KEYS
                expect(corkCount).toBe(1);
                db.close();
                db.on('write_close', () => {
                  try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
                  done();
                });
              } catch (e) {
                try { fs.unlinkSync(tmpFile); } catch (err) { /* ignore */ }
                done(e as Error);
              }
            });
          }
        });
      }
    });
  });
});