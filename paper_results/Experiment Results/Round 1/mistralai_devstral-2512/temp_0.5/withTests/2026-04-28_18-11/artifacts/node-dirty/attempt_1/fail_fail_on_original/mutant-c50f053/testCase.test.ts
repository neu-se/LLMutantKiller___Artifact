import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event when write fails and no callbacks are registered', (done) => {
    // Create a directory with the same name as the file to force a write error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);
    db.on('load', () => {
      // Try to write to the "file" (which is actually a directory)
      db.set('key', 'value');

      // The mutation prevents error emission when no callbacks are registered
      db.on('error', (err) => {
        expect(err).toBeDefined();
        done();
      });

      // Clean up after a timeout to ensure test completes
      setTimeout(() => {
        done.fail('Error event was not emitted');
      }, 1000);
    });
  });
});