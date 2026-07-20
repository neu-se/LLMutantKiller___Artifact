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
    let errorEmitted = false;
    let loadEmitted = false;

    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeDefined();
      expect(err.code).not.toBe('ENOENT');
    });

    dirty.on('load', () => {
      loadEmitted = true;
    });

    setTimeout(() => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });

      // Verify that error was emitted and load was not
      expect(errorEmitted).toBe(true);
      expect(loadEmitted).toBe(false);
      done();
    }, 100);
  });
});