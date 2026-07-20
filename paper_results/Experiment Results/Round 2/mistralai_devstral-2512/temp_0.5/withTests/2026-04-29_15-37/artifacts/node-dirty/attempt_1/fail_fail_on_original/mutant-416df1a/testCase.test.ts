import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error handling on write failure', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error when write fails and no callbacks are registered', (done) => {
    // Create a directory with the same name as the file to force a write error
    fs.mkdirSync(testFile);

    db = new Dirty(testFile);
    db.on('load', () => {
      // The error should be emitted when trying to write
      db.on('error', (err) => {
        expect(err).toBeDefined();
        expect((err as NodeJS.ErrnoException).code).toBe('EISDIR');
        done();
      });

      // Trigger a write operation without a callback
      db.set('key', 'value');
    });
  });
});