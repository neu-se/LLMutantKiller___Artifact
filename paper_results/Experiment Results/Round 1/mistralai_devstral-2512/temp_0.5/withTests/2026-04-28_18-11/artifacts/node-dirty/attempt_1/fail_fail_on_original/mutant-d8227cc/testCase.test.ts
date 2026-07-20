import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant detection test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should correctly handle chunks without newlines during load', (done) => {
    // Create a test file with a single line (no newline at end)
    const testData = '{"key":"test","val":"value"}';
    fs.writeFileSync(testFile, testData, 'utf-8');

    db = new Dirty(testFile);

    db.on('load', (size) => {
      try {
        // Should have loaded the one record
        expect(size).toBe(1);
        expect(db.get('test')).toBe('value');
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});