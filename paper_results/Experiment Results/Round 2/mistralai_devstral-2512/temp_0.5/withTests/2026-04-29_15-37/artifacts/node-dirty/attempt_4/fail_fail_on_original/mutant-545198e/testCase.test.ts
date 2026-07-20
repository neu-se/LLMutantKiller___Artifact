import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-545198e', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  afterAll(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should correctly handle incomplete lines during file loading', (done) => {
    // Create a test file with data that doesn't end with newline
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}', 'utf-8');

    const db = new Dirty(testFile);
    let errorOccurred = false;

    db.on('load', (size) => {
      // In original code, this should load with size 0 (incomplete line discarded)
      expect(size).toBe(0);
      expect(db.get('test')).toBeUndefined();
      if (!errorOccurred) {
        done();
      }
    });

    db.on('error', (err) => {
      errorOccurred = true;
      // This should not be called in original code
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});