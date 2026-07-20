import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');

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

  it('should emit error event with correct event name when empty line is encountered', (done) => {
    // Create a test file with an empty line
    fs.writeFileSync(testFile, '\n{"key":"test","val":"value"}\n', 'utf-8');

    const db = new Dirty(testFile);
    let errorEmitted = false;

    // Listen for error event
    db.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    // Also listen for load to ensure we don't get there
    db.on('load', () => {
      if (!errorEmitted) {
        done('Should not emit load event when error occurs');
      }
    });
  });
});