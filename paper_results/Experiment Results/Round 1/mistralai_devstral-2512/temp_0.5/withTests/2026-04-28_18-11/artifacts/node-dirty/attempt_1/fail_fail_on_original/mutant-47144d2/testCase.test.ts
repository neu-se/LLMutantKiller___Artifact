import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('empty line handling', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error when encountering empty lines in database file', (done) => {
    // Create a database file with an empty line
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n', 'utf-8');

    db = new Dirty(testFile);

    db.on('error', (err) => {
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    db.on('load', () => {
      fail('Should not emit load event when error occurs');
    });
  });
});