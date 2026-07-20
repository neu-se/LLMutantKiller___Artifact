import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('flush loop mutation detection', () => {
  it('should not emit drain while there are still pending write callbacks', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpFile = path.join(os.tmpdir(), `dirty-test-mutant-${process.pid}-${Date.now()}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      let cb2Done = false;
      let drainFiredBeforeCb2 = false;

      db.once('drain', () => {
        // At the time of first drain, cb2 should already be done in original code
        // In mutated code, drain fires after only key1 is written, before key2 callback
        if (!cb2Done) {
          drainFiredBeforeCb2 = true;
        }
      });

      db.set('key1', 'v1', () => {
        // key1 callback
      });
      db.set('key2', 'v2', () => {
        cb2Done = true;
        // After both are done, check behavior
        setImmediate(() => {
          try {
            expect(drainFiredBeforeCb2).toBe(false);
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
      });
    });
  });
});