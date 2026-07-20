import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Empty line error handling', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
  let db: any;
  let errorEmitted = false;

  beforeEach(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
    errorEmitted = false;
  });

  afterEach(() => {
    try {
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    } catch (err) {
      // Ignore errors
    }
  });

  it('should emit error with descriptive message for empty lines in database', (done) => {
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n', 'utf-8');

    db = new (require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"))(testFile);

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Should have emitted error before load event'));
      }
    });
  });
});