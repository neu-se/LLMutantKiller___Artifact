import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop mutation detection', () => {
  it('should process all queued keys in one flush cycle with many keys', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      const NUM_KEYS = 10;
      let drainCount = 0;
      let callbacksReceived = 0;

      db.on('drain', () => { drainCount++; });

      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, `val${i}`, () => {
          callbacksReceived++;
          if (callbacksReceived === NUM_KEYS) {
            setImmediate(() => {
              try {
                // Original: all keys in one flush -> 1 drain
                // Mutated: one key per flush -> 10 drains
                expect(drainCount).toBe(1);
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