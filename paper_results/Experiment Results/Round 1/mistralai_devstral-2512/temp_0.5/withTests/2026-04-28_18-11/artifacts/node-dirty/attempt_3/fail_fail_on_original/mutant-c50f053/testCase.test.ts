import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorEmitted = false;

  beforeEach(() => {
    // Clean up any existing file or directory
    try {
      const stats = fs.statSync(testFile);
      if (stats.isDirectory()) {
        fs.rmdirSync(testFile);
      } else {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore if file/directory doesn't exist
    }
  });

  afterEach(() => {
    // Clean up after test
    try {
      const stats = fs.statSync(testFile);
      if (stats.isDirectory()) {
        fs.rmdirSync(testFile);
      } else {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore if file/directory doesn't exist
    }
  });

  it('should emit error event when write fails and no callbacks are registered', (done) => {
    // Create a directory with the same name as the file to force a write error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);
    db.on('load', () => {
      // Try to write to the "file" (which is actually a directory)
      db.set('key', 'value');

      // Listen for error event
      db.on('error', (err: Error) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        done();
      });

      // Set a timeout to fail the test if error is not emitted
      setTimeout(() => {
        if (!errorEmitted) {
          done.fail('Error event was not emitted');
        }
      }, 1000);
    });
  });
});