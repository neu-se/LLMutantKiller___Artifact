import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;

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

  it('should emit error event with correct event name when file read fails', (done) => {
    // Create a file that will cause a read error (not ENOENT)
    fs.writeFileSync(testFile, 'corrupted data that will cause parse error');
    fs.chmodSync(testFile, 0o000); // Make file unreadable

    db = new Dirty(testFile);

    // Listen for error event with correct event name
    db.on('error', (err: Error) => {
      expect(err).toBeDefined();
      done();
    });

    // Also listen for empty string event to detect mutation
    db.on('', (err: Error) => {
      // This should never be called in the original code
      done(new Error('Mutation detected: error event emitted with empty string event name'));
    });
  });
});