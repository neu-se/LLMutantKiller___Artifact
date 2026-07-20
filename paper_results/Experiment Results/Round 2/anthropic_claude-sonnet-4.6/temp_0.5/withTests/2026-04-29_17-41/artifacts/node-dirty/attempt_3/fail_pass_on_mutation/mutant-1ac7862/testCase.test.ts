import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop drain event count', () => {
  it('should fire drain only once when writing two keys with no buffer pressure', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      let drainCount = 0;

      db.set('key1', 'v1');
      db.set('key2', 'v2');

      db.on('drain', () => {
        drainCount++;
      });

      // Wait for all writes to complete by using callbacks
      let cb1Done = false;
      let cb2Done = false;

      const checkDone = () => {
        if (cb1Done && cb2Done) {
          // Give a tick for any extra drain events to fire
          setImmediate(() => {
            try {
              // In original: both keys written in one flush, one drain event
              // In mutated: keys written one at a time, two drain events
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
      };

      // Re-set with callbacks to know when both are done
      db.set('key1', 'v1', () => { cb1Done = true; checkDone(); });
      db.set('key2', 'v2', () => { cb2Done = true; checkDone(); });
    });
  });
});