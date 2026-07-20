import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test data chunk processing', () => {
  const testFile = path.join(__dirname, 'test-chunk.dirty');

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

  it('should handle incomplete lines without newline correctly', (done) => {
    const db = new Dirty(testFile);
    let loadFired = false;
    let errorFired = false;

    db.on('load', (length) => {
      if (loadFired) return;
      loadFired = true;

      // In original code, incomplete line should be buffered and not processed
      // In mutated code, it will be processed incorrectly
      expect(length).toBe(0);
      done();
    });

    db.on('error', (err) => {
      if (errorFired) return;
      errorFired = true;
      // This should not happen in original code
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Write data without newline to trigger the placeholder condition
    fs.writeFileSync(testFile, '{"key":"test","val":"data"}', 'utf-8');
  });
});