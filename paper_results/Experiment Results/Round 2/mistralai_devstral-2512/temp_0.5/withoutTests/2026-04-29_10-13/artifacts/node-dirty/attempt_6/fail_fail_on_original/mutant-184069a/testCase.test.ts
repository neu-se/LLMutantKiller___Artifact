import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error event for non-ENOENT errors during load', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a file with invalid permissions to trigger an EACCES error
    fs.writeFileSync(dbPath, '', { mode: 0o000 });

    const dirty = new Dirty(dbPath);
    let errorEmitted = false;

    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeDefined();
      expect(err.code).toBe('EACCES');

      // Clean up
      fs.chmodSync(dbPath, 0o644);
      fs.rmSync(testDir, { recursive: true, force: true });
      done();
    });

    dirty.on('load', () => {
      // Clean up
      fs.chmodSync(dbPath, 0o644);
      fs.rmSync(testDir, { recursive: true, force: true });
      if (!errorEmitted) {
        done(new Error('Error event should be emitted for EACCES'));
      }
    });
  });
});