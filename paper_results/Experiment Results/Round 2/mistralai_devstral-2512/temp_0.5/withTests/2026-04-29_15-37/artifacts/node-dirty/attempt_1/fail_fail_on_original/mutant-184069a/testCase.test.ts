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

  it('should emit error event when file exists but is corrupted', (done) => {
    // Create a corrupted file (empty file)
    fs.writeFileSync(testFile, '', 'utf-8');

    const db = new Dirty(testFile);

    db.on('error', (err) => {
      // The original code should emit an error when trying to parse empty lines
      // The mutant will incorrectly handle all errors as ENOENT and not emit proper errors
      expect(err).toBeDefined();
      expect(err.message).toContain('Empty lines never appear in a healthy database');
      done();
    });

    db.on('load', () => {
      // If we get here, the test failed because no error was emitted
      done(new Error('Expected error event to be emitted for corrupted file'));
    });
  });
});