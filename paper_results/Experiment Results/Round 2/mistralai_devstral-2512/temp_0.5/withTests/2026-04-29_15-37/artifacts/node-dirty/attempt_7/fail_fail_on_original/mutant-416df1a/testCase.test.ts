import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error handling on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorListener: (err: NodeJS.ErrnoException) => void;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.rmSync(testFile, { recursive: true, force: true });
    }
    if (db) {
      db.removeListener('error', errorListener);
    }
  });

  it('should emit error when write fails and no callbacks are registered', (done) => {
    // Create a directory with the same name as the file to force a write error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up error listener
      errorListener = (err: NodeJS.ErrnoException) => {
        expect(err).toBeDefined();
        expect(err.code).toBe('EISDIR');
        done();
      };
      db.on('error', errorListener);

      // Trigger a write operation without a callback
      db.set('key', 'value');

      // Set a timeout to fail the test if error is not emitted
      setTimeout(() => {
        done(new Error('Error event was not emitted'));
      }, 3000);
    });
  }, 5000);
});