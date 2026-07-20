import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorEmitted = false;

  beforeEach(() => {
    // Clean up any existing file
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore cleanup errors
    }
  });

  afterEach(() => {
    // Clean up after test
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore cleanup errors
    }
  });

  it('should emit error event when write fails with no callbacks', (done) => {
    // Create a valid file first
    fs.writeFileSync(testFile, '');

    // Make the file read-only to trigger write errors
    fs.chmodSync(testFile, 0o444);

    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up error listener
      db.on('error', (err: Error) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        done();
      });

      // Try to write without callback - this should trigger error event
      db.set('key', 'value');

      // Set timeout to fail test if no error emitted
      setTimeout(() => {
        if (!errorEmitted) {
          done(new Error('Error event was not emitted'));
        }
      }, 1000);
    });
  });
});