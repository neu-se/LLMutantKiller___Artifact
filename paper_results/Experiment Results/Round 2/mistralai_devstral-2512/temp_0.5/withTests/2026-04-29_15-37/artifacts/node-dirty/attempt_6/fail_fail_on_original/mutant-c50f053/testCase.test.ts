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
      // Force a write error by making the file read-only
      fs.chmodSync(testFile, 0o444);

      // Set a value without a callback to trigger the error emission path
      db.set('test-key', 'test-value');

      // Listen for error event
      const errorHandler = (err: Error) => {
        expect(err).toBeDefined();
        done();
      };
      db.on('error', errorHandler);

      // Also listen for drain to ensure we don't miss the error
      db.on('drain', () => {
        // If drain is emitted, remove error listener to prevent memory leak
        db.off('error', errorHandler);
        done(new Error('Drain event was emitted instead of error'));
      });

      // Timeout to prevent hanging
      setTimeout(() => {
        db.off('error', errorHandler);
        done(new Error('Test timed out - no error was emitted'));
      }, 1000);
    });
  });
});