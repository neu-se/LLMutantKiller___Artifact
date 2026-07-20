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
      // Override the write stream's write method to simulate an error
      const originalWrite = dirty._writeStream.write;
      dirty._writeStream.write = function(data, callback) {
        // Simulate an error by calling the callback with an error
        if (callback) {
          setImmediate(() => callback(new Error('Simulated write error')));
        }
        return false; // Return false to indicate backpressure
      };

      // Track error emission
      let errorEmitted = false;
      dirty.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        expect(err.message).toBe('Simulated write error');
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
      }, 500);
    });
  });
});