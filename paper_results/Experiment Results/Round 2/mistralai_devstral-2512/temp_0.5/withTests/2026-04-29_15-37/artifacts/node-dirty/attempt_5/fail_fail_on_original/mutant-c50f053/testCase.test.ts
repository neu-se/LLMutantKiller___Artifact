import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorListener: (err: Error) => void;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    if (db && errorListener) {
      db.off('error', errorListener);
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
      errorListener = (err: Error) => {
        expect(err).toBeDefined();
        done();
      };
      db.on('error', errorListener);

      // Timeout to prevent hanging
      setTimeout(() => {
        done(new Error('Test timed out - no error was emitted'));
      }, 1000);
    });
  });
});