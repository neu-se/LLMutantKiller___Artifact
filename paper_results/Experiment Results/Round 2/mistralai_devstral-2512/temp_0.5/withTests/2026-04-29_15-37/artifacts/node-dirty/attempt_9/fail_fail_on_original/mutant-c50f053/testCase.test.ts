import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;

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
      // Create a scenario where write will fail
      // Close the write stream to force an error
      if (db._writeStream) {
        db._writeStream.destroy(new Error('Forced write error'));
      }

      // Set a value without a callback to trigger the error emission path
      db.set('test-key', 'test-value');

      // Listen for error event
      db.on('error', (err: Error) => {
        expect(err).toBeDefined();
        expect(err.message).toContain('Forced write error');
        done();
      });

      // Timeout to prevent hanging
      setTimeout(() => {
        done(new Error('Test timed out - no error was emitted'));
      }, 1000);
    });
  });
});