import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error emission on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event when write fails and no callbacks are registered', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force a write error by making the file read-only
      fs.chmodSync(testFile, 0o444);

      // Set a value without a callback to trigger the error emission path
      db.set('test-key', 'test-value');

      db.on('error', (err) => {
        expect(err).toBeDefined();
        done();
      });
    });
  });
});