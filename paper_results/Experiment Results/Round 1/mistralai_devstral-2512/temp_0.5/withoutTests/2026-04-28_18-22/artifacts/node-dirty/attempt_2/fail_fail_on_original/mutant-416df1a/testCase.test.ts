import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database error handling', () => {
  it('should emit error event when write fails with no callbacks', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Make the file read-only to force write error
      fs.chmodSync(dbPath, 0o444);

      // Listen for error event
      dirty.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        fs.chmodSync(dbPath, 0o644); // Restore permissions
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });

      // Trigger write without callback
      dirty.set('key1', { test: 'data' });
    });

    // Cleanup on timeout
    setTimeout(() => {
      try {
        fs.chmodSync(dbPath, 0o644);
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
      } catch (e) {
        // Ignore cleanup errors
      }
      done(new Error('Test timed out'));
    }, 2000);
  });
});