import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-545198e', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  afterAll(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should process data chunks with newlines correctly', (done) => {
    // Create a test file with properly formatted data
    fs.writeFileSync(testFile, '{"key":"test1","val":"value1"}\n{"key":"test2","val":"value2"}\n', 'utf-8');

    const db = new Dirty(testFile);
    let loadFired = false;

    db.on('load', (size) => {
      if (loadFired) return;
      loadFired = true;
      // Both original and mutated code should load both complete lines
      expect(size).toBe(2);
      expect(db.get('test1')).toBe('value1');
      expect(db.get('test2')).toBe('value2');
      done();
    });

    db.on('error', (err) => {
      if (loadFired) return;
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});