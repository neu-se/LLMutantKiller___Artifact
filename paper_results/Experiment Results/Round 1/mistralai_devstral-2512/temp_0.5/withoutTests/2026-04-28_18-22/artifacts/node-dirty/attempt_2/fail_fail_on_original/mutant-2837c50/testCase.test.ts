import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should properly close when called with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Force close while there are pending writes
      dirty.close();

      // Verify close behavior
      setImmediate(() => {
        try {
          // The original code should have closed streams after drain
          // The mutated code won't properly close, so streams will still exist
          if (dirty._writeStream !== null) {
            done(new Error('Write stream should be closed'));
          } else {
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          }
        } catch (err) {
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done(err);
        }
      });
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});