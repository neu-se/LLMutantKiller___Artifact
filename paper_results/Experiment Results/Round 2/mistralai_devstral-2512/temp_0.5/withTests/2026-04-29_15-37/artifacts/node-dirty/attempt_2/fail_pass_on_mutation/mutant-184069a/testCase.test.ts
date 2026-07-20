import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant detection test', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should emit load event with size 0 for non-existent file', (done) => {
    const db = new Dirty(testFile);

    db.on('load', (size) => {
      expect(size).toBe(0);
      done();
    });

    db.on('error', (err) => {
      done(new Error(`Unexpected error event: ${err.message}`));
    });
  });
});