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

  it('should buffer incomplete lines without newline', (done) => {
    const db = new Dirty(testFile);
    let hasError = false;

    db.on('load', (length) => {
      // In original code, incomplete line should be buffered and not processed
      // In mutated code, it will try to process it and fail
      expect(length).toBe(0);
      done();
    });

    db.on('error', (err) => {
      hasError = true;
      // This should not happen in original code
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Write data without newline to trigger the placeholder condition
    fs.writeFileSync(testFile, '{"key":"test","val":"data"}', 'utf-8');
  });
});