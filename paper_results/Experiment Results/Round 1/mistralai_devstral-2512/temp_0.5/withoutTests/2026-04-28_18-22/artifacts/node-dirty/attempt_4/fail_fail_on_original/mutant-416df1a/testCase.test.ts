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
      // Create a full disk scenario by filling the filesystem
      const testFile = path.join(testDir, 'fill.txt');
      try {
        // Try to fill the disk (this might not work in all environments)
        const fd = fs.openSync(testFile, 'w');
        while (true) {
          fs.writeSync(fd, 'x'.repeat(1024 * 1024)); // Write 1MB chunks
        }
      } catch (e) {
        // Expected to fail when disk is full
      }

      // Track error emission
      let errorEmitted = false;
      dirty.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        // Cleanup
        try {
          fs.unlinkSync(testFile);
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
        } catch (e) {
          // Ignore cleanup errors
        }
        done();
      });

      // Trigger write without callback
      dirty.set('testKey', { data: 'test' });

      // Fail test if no error emitted
      setTimeout(() => {
        if (!errorEmitted) {
          try {
            fs.unlinkSync(testFile);
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