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

  it('should emit error event for permission errors during file read', (done) => {
    // Create a file with read-only permissions to trigger EPERM error
    fs.writeFileSync(testFile, '', 'utf-8');
    fs.chmodSync(testFile, 0o200); // Write-only permissions

    const db = new Dirty(testFile);

    db.on('error', (err) => {
      // Original code should emit EPERM error
      // Mutant code will incorrectly treat all errors as ENOENT and emit load instead
      expect(err.code).toBe('EPERM');
      done();
    });

    db.on('load', () => {
      // If we get here, the mutant code is executing
      done(new Error('Expected error event for EPERM, not load event'));
    });
  });
});