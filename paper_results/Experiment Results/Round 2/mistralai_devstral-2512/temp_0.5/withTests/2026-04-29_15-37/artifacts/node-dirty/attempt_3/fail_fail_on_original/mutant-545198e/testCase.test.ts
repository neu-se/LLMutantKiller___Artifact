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
    let loadFired = false;

    db.on('load', (size) => {
      loadFired = true;
      // In original code, this should load with size 0 (incomplete line discarded)
      // In mutated code, it will try to process the incomplete line
      expect(size).toBe(0);
      done();
    });

    db.on('error', (err) => {
      // This should not be called in original code
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Give it time to process
    setTimeout(() => {
      if (!loadFired) {
        done(new Error('Load event never fired'));
      }
    }, 100);
  });
});