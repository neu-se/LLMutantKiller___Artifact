import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database error handling', () => {
  it('should emit error when write fails with no callbacks', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Force a write error by closing the write stream
      if (dirty._writeStream) {
        dirty._writeStream.destroy(new Error('Simulated write error'));
      }

      // Track error emission
      let errorEmitted = false;
      dirty.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        // Cleanup
        try {
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
        } catch (e) {
          // Ignore cleanup errors
        }
        done();
      });

      // Trigger write without callback
      dirty.set('testKey', { data: 'test' });

      // Fail test if no error emitted within timeout
      setTimeout(() => {
        if (!errorEmitted) {
          try {
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
          } catch (e) {
            // Ignore cleanup errors
          }
          done(new Error('Expected error event was not emitted'));
        }
      }, 1000);
    });
  });
});