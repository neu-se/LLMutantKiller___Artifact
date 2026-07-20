import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('empty line handling', () => {
  const testFile = path.join(__dirname, 'test-empty-line.dirty');
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

  it('should emit error when encountering empty lines in database file', (done) => {
    // Create a database file with an empty line
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n', 'utf-8');

    db = new Dirty(testFile);

    let errorEmitted = false;
    let loadEmitted = false;

    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      // Check immediately if load was emitted
      expect(loadEmitted).toBe(false);
      done();
    });

    db.on('load', () => {
      loadEmitted = true;
      if (!errorEmitted) {
        done(new Error('Load event emitted without error event'));
      }
    });
  });
});