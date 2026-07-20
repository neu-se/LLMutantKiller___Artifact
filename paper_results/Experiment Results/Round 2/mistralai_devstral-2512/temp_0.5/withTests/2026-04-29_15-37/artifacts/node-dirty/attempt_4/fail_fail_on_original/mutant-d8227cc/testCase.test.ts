import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test newline detection in data chunks', () => {
  const testFile = path.join(__dirname, 'test-newline.dirty');

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

  it('should correctly process chunks without newlines', (done) => {
    // Create a file with a partial line (no newline at end)
    fs.writeFileSync(testFile, '{"key":"test","val":"data"}', 'utf-8');

    const db = new Dirty(testFile);
    let errorOccurred = false;

    db.on('load', (size) => {
      // Original code should handle this without error
      expect(size).toBe(0); // No complete lines, so nothing loaded
      if (!errorOccurred) {
        done();
      }
    });

    db.on('error', (err) => {
      errorOccurred = true;
      done(err); // This will fail the test if error is emitted
    });
  }, 1000); // Add timeout to prevent hanging
});