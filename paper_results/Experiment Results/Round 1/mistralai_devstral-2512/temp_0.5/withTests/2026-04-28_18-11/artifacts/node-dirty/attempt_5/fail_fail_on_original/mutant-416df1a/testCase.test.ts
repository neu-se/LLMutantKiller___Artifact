import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error emission behavior', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should emit error when write fails with no callbacks', (done) => {
    // Create a valid file first
    fs.writeFileSync(testFile, '');

    db = new Dirty(testFile);
    db.on('load', () => {
      // Make the file unwritable to force a write error
      fs.chmodSync(testFile, 0o444);

      // Set up error listener
      db.on('error', (err: Error) => {
        expect(err).toBeDefined();
        done();
      });

      // This write should fail because file is read-only
      // We don't pass a callback to set() to test the error emission behavior
      db.set('key', 'value');

      // Restore write permissions after a short delay
      setTimeout(() => {
        try {
          fs.chmodSync(testFile, 0o644);
        } catch (err) {
          // Ignore error
        }
      }, 500);
    });
  });
});