import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-545198e', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  afterAll(() => {
    try { rimraf.sync(testFile); } catch (e) {}
  });

  it('should process incomplete lines correctly during file loading', (done) => {
    // Create a test file with data that doesn't end with newline
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}', 'utf-8');

    const db = new Dirty(testFile);
    db.on('load', (size) => {
      // In original code, this should load successfully with size 1
      // In mutated code, it will try to process the incomplete line and fail
      expect(size).toBe(1);
      expect(db.get('test')).toBe('value');
      done();
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});