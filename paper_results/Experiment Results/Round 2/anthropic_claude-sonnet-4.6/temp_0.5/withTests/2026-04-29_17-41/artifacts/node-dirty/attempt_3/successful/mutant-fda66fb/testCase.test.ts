import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream drain handling', () => {
  it('should persist all keys to disk before emitting drain even under backpressure', (done) => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    const totalKeys = 300;

    db.on('load', () => {
      for (let i = 0; i < totalKeys; i++) {
        db.set(`key${i}`, 'x'.repeat(1000));
      }

      db.on('drain', () => {
        // After drain, reload the db from disk and verify all keys are present
        const db2 = new Dirty(file);
        db2.on('load', (length: number) => {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          if (length === totalKeys) {
            done();
          } else {
            done(new Error(`Expected ${totalKeys} keys on disk but found ${length}`));
          }
        });
        db2.on('error', (err: Error) => {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        });
      });
    });
  });
});