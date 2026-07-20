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
      // Make directory read-only to force write error
      fs.chmodSync(testDir, 0o444);

      // Track if error was emitted
      let errorEmitted = false;
      dirty.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        // Restore permissions for cleanup
        fs.chmodSync(testDir, 0o755);
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });

      // Trigger write without callback
      dirty.set('testKey', { data: 'test' });

      // Fail test if no error emitted within timeout
      setTimeout(() => {
        if (!errorEmitted) {
          fs.chmodSync(testDir, 0o755);
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done(new Error('Expected error event was not emitted'));
        }
      }, 1000);
    });
  });
});