import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty close behavior', () => {
  it('should properly handle close with pending writes by waiting for drain', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.once('load', () => {
      // Add data to create pending writes
      dirty.set('key1', { value: 'test1' });
      dirty.set('key2', { value: 'test2' });

      // Track close behavior
      let closeReturnedEarly = false;
      const originalClose = dirty.close.bind(dirty);
      dirty.close = function() {
        if (dirty._queue.size > 0 || dirty._inFlightWrites > 0) {
          closeReturnedEarly = true;
        }
        return originalClose();
      };

      // Force close while there are pending writes
      const result = dirty.close();

      // In original code, close should return undefined when waiting for drain
      // In mutated code, it will also return undefined but won't properly wait
      setImmediate(() => {
        try {
          if (!closeReturnedEarly) {
            throw new Error('Close should return early when there are pending writes');
          }
          if (dirty._writeStream !== null) {
            throw new Error('Write stream should be closed after drain');
          }
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
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