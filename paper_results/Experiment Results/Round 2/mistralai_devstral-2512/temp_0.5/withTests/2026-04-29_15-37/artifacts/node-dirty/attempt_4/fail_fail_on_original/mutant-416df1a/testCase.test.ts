import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error handling on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorEmitted = false;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
  });

  it('should emit error when write fails and no callbacks are registered', (done) => {
    // Create a directory with the same name as the file to force a write error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);
    db.on('load', () => {
      // The error should be emitted when trying to write
      db.on('error', (err: NodeJS.ErrnoException) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        expect(err.code).toBe('EISDIR');
        done();
      });

      // Trigger a write operation without a callback
      db.set('key', 'value');

      // Set a timeout to fail the test if error is not emitted
      setTimeout(() => {
        if (!errorEmitted) {
          done(new Error('Error event was not emitted'));
        }
      }, 1000);
    });
  });
});