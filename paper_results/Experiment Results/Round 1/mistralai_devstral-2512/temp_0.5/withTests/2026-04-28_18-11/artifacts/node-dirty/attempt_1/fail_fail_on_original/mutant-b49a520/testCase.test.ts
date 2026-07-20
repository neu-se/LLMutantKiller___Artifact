import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('dirty database chunk processing', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should correctly process chunks without newlines', (done) => {
    // Create a test file with a chunk that doesn't end with a newline
    const testData = '{"key":"test","val":"data"}';
    fs.writeFileSync(testFile, testData);

    db = new Dirty(testFile);
    db.on('load', (length) => {
      // The original code will process this correctly
      // The mutated code will fail to process it due to the incorrect condition
      expect(db.get('test')).toBe('data');
      expect(length).toBe(1);
      done();
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});