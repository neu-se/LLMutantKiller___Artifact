import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorEmitted = false;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should emit error event when write fails and no callbacks are registered', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force a write error by making the file read-only
      fs.chmodSync(testFile, 0o444);

      // Set a value without a callback to trigger the error emission path
      db.set('test-key', 'test-value');

      // Listen for error event
      db.on('error', (err: Error) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        done();
      });

      // Check after a short delay if error was emitted
      setTimeout(() => {
        if (!errorEmitted) {
          // Restore write permissions and try a different approach
          fs.chmodSync(testFile, 0o644);
          // Force an error by writing invalid data
          fs.appendFileSync(testFile, 'invalid json data\n');
          fs.chmodSync(testFile, 0o444);
          db.set('test-key2', 'test-value2');
          setTimeout(() => {
            if (!errorEmitted) {
              done(new Error('Error event was not emitted'));
            }
          }, 100);
        }
      }, 100);
    });
  });
});