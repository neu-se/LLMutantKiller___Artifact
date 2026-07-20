import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error emission behavior', () => {
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

  it('should emit error when write fails with no callbacks', (done) => {
    // Create a valid file first
    fs.writeFileSync(testFile, '');

    db = new Dirty(testFile);
    db.on('load', () => {
      // Make the file unwritable to force an error
      fs.chmodSync(testFile, 0o000);

      // Set up error listener
      db.on('error', (err: NodeJS.ErrnoException) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        done();
      });

      // Trigger a write operation without a callback
      db.set('key', 'value');

      // Restore permissions after a short delay
      setTimeout(() => {
        fs.chmodSync(testFile, 0o644);
        if (!errorEmitted) {
          done(new Error('Error event was not emitted'));
        }
      }, 100);
    });
  }, 10000);
});