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

      // Track close calls
      let closeCallCount = 0;
      const originalClose = dirty.close.bind(dirty);
      dirty.close = function() {
        closeCallCount++;
        if (closeCallCount > 1) {
          // Second call should happen after drain
          expect(closeCallCount).toBe(2);
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
          return;
        }
        originalClose();
      };

      // Force close while there are pending writes
      dirty.close();
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(new Error('Test timed out - close not called twice'));
    }, 2000);
  });
});