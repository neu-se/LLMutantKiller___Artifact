import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test data chunk processing', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');

  beforeEach(() => {
    // Clean up test file if it exists
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    // Clean up test file if it exists
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should handle incomplete line chunks without newline', (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;

    db.on('load', (length) => {
      loadFired = true;
      // This should be 0 because the incomplete line should be buffered
      expect(length).toBe(0);
      done();
    });

    db.on('error', (err) => {
      // Should not emit error for incomplete lines
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Create a file with data that doesn't end with newline
    fs.writeFileSync(testFile, '{"key":"test","val":"data"}', 'utf-8');
  });
});