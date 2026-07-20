import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event fires after all write callbacks', () => {
  it('should call all set callbacks before emitting drain when writes cause backpressure', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      const totalKeys = 200;
      let callbackCount = 0;

      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, 'x'.repeat(500), () => {
          callbackCount++;
        });
      }

      db.on('drain', () => {
        const allCallbacksFired = callbackCount === totalKeys;
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        if (allCallbacksFired) {
          done();
        } else {
          done(new Error(`Expected ${totalKeys} callbacks but got ${callbackCount}`));
        }
      });
    });
  });
});