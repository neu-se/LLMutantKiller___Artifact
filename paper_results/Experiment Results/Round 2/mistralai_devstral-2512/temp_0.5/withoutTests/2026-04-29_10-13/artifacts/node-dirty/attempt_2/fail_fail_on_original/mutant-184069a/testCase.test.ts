import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error event for non-ENOENT errors during load', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a file with invalid content to trigger a parsing error
    fs.writeFileSync(dbPath, 'invalid json content');

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
      // This should not be called when there's an error
      fs.rmSync(testDir, { recursive: true, force: true });
      done(new Error('Load event should not be emitted when there is an error'));
    });
  });
});