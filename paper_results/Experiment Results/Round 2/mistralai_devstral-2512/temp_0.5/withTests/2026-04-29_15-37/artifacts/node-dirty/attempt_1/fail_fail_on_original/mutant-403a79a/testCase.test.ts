import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Empty line error handling', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Clean up before each test
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  afterEach(() => {
    // Clean up after each test
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  it('should emit error with descriptive message for empty lines in database', (done) => {
    // Create a test file with an empty line
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n', 'utf-8');

    db = new Dirty(testFile);

    db.on('error', (err: Error) => {
      // The original code should emit an error with a descriptive message
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    // Also listen for load to ensure we don't get there
    db.on('load', () => {
      done(new Error('Should not emit load event when there are empty lines'));
    });
  });
});