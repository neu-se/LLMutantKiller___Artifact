import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event with correct event name when file read fails', (done) => {
    // Create a file that will cause a read error (not ENOENT)
    fs.writeFileSync(testFile, '', { mode: 0o000 }); // Make file unreadable

    db = new Dirty(testFile);

    // Listen for error event with correct event name
    db.on('error', (err) => {
      expect(err).toBeDefined();
      expect(err.code).not.toBe('ENOENT');
      done();
    });

    // Also listen for empty string event to detect mutation
    db.on('', (err) => {
      // This should never be called in the original code
      done(new Error('Mutation detected: error event emitted with empty string event name'));
    });
  });
});