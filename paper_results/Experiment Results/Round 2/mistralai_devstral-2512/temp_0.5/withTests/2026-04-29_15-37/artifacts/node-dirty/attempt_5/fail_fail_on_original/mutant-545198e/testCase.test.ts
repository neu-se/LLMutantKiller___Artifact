import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-545198e', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  afterAll(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should process complete lines and buffer incomplete lines during loading', (done) => {
    // Create a test file with one complete line and one incomplete line
    fs.writeFileSync(testFile, '{"key":"complete","val":"data"}\n{"key":"incomplete","val":"data"}', 'utf-8');

    const db = new Dirty(testFile);
    let loadFired = false;

    db.on('load', (size) => {
      loadFired = true;
      // Original code should load only the complete line (size 1)
      // Mutated code will try to process the incomplete line
      expect(size).toBe(1);
      expect(db.get('complete')).toBe('data');
      expect(db.get('incomplete')).toBeUndefined();
      done();
    });

    db.on('error', (err) => {
      // This should not be called in original code
      if (!loadFired) {
        done(new Error(`Unexpected error: ${err.message}`));
      }
    });
  });
});