import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error event for non-ENOENT file errors during load', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a directory instead of a file to trigger a non-ENOENT error
    fs.mkdirSync(dbPath);

    const dirty = new Dirty(dbPath);

    dirty.on('error', (err) => {
      // Verify that the error is not silently ignored
      expect(err).toBeDefined();
      expect(err.code).not.toBe('ENOENT');

      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done();
    });

    dirty.on('load', () => {
      // This should not be called when there's a non-ENOENT error
      fs.rmSync(testDir, { recursive: true, force: true });
      done(new Error('Load event should not be emitted for non-ENOENT errors'));
    });
  });
});