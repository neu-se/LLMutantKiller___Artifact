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
      // Track both error and drain events
      let errorEmitted = false;
      let drainEmitted = false;

      dirty.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
      });

      dirty.on('drain', () => {
        drainEmitted = true;
      });

      // Trigger write without callback
      dirty.set('testKey', { data: 'test' });

      // Check results after a short delay
      setTimeout(() => {
        try {
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
        } catch (e) {
          // Ignore cleanup errors
        }

        // Original code should emit error when no callbacks and error occurs
        // Mutated code won't emit error in this case
        if (!errorEmitted) {
          done(new Error('Expected error event was not emitted'));
        } else {
          done();
        }
      }, 100);
    });
  });
});