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

  it('should emit error event with correct event name when empty line is encountered', (done) => {
    // Create a test file with an empty line
    fs.writeFileSync(testFile, '\n{"key":"test","val":"value"}\n', 'utf-8');

    db = new Dirty(testFile);

    // Listen for error event
    db.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    // Also listen for load to ensure we don't get there
    db.on('load', () => {
      done('Should not emit load event when error occurs');
    });
  });
});