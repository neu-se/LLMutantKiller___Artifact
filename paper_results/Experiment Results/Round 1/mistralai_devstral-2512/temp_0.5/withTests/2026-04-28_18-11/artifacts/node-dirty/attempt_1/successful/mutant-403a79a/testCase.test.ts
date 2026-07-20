import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Empty line error handling', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error with descriptive message for empty lines', (done) => {
    // Create a file with an empty line
    fs.writeFileSync(testFile, '\n{"key":"test","val":"value"}\n', 'utf-8');

    db = new Dirty(testFile);
    db.on('error', (err: Error) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });
  });
});