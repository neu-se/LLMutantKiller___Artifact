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

      db.on('error', (err: Error) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        done();
      });

      // Verify error was emitted after a short delay
      setTimeout(() => {
        if (!errorEmitted) {
          done(new Error('Error event was not emitted'));
        }
      }, 100);
    });
  });
});