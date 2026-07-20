import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior with pending writes', () => {
  it('should delay close until writes complete', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add multiple items to create pending writes
      dirty.set('key1', { value: 'test1' }, () => {});
      dirty.set('key2', { value: 'test2' }, () => {});
      dirty.set('key3', { value: 'test3' }, () => {});

      // Track when close actually completes
      let closeCompleted = false;
      const originalEnd = dirty._writeStream.end.bind(dirty._writeStream);
      dirty._writeStream.end = function(...args) {
        closeCompleted = true;
        return originalEnd(...args);
      };

      // Call close immediately after setting values
      dirty.close();

      // Verify close was delayed
      setImmediate(() => {
        try {
          expect(closeCompleted).toBe(false);
          done();
        } catch (error) {
          done(error);
        } finally {
          // Cleanup
          if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
        }
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