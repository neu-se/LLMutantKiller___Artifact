import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-545198e', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  afterAll(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should handle data chunks without newlines during loading', (done) => {
    // Create a test file with data that doesn't end with newline
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}', 'utf-8');

    const db = new Dirty(testFile);
    let loadCalled = false;
    let errorCalled = false;

    db.on('load', (size) => {
      if (loadCalled) return;
      loadCalled = true;
      // Original code should load with size 0 (incomplete line discarded)
      // Mutated code will try to process the incomplete line
      expect(size).toBe(0);
      expect(db.get('test')).toBeUndefined();
      done();
    });

    db.on('error', (err) => {
      if (errorCalled) return;
      errorCalled = true;
      // This should not be called in original code
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});