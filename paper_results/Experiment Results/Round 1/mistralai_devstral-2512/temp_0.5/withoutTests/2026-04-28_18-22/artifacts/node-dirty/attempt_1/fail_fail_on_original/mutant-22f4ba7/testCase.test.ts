import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should emit drain event when close is called with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add some data to trigger writes
      dirty.set('key1', { value: 'test1' }, () => {
        // Immediately call close while there might still be pending writes
        const drainListener = () => {
          dirty.removeListener('drain', drainListener);
          try {
            // Verify the close operation completed properly
            expect(dirty._writeStream).toBeNull();
            expect(dirty._readStream).toBeNull();
            done();
          } catch (error) {
            done(error);
          } finally {
            // Cleanup
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
          }
        };

        dirty.once('drain', drainListener);
        dirty.close();
      });
    });

    dirty.on('error', (err) => {
      // Cleanup in case of error
      try {
        if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch {
        // Ignore cleanup errors
      }
      done(err);
    });
  });
});