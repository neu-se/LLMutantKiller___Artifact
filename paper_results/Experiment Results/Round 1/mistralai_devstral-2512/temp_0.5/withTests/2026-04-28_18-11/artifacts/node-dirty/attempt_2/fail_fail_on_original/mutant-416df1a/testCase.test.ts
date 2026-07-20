import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error emission on write failure', () => {
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

  it('should emit error when write fails and no callbacks are registered', (done) => {
    // Create a directory with the same name as the file to force a write error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);
    db.on('load', () => {
      // This write should fail because testFile is a directory
      db.set('key', 'value');

      db.on('error', (err: Error) => {
        expect(err).toBeDefined();
        expect(err.message).toContain('EISDIR');
        done();
      });

      // Clean up the directory after a timeout to prevent test hanging
      setTimeout(() => {
        try {
          fs.rmdirSync(testFile);
        } catch (err) {
          // Ignore error if directory doesn't exist
        }
      }, 1000);
    });
  });
});