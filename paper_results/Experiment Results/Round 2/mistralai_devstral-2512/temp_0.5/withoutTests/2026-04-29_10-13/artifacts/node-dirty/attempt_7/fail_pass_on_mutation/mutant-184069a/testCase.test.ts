import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database ENOENT handling', () => {
  it('should emit load event with 0 for missing file (ENOENT)', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'nonexistent.db');

    // Create test directory but don't create the file
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let loadCalled = false;
    let errorCalled = false;

    dirty.on('load', (size) => {
      loadCalled = true;
      expect(size).toBe(0);
    });

    dirty.on('error', (err) => {
      errorCalled = true;
      expect(err.code).toBe('ENOENT');
    });

    setTimeout(() => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });

      // In original code, ENOENT should trigger load(0), not error
      // In mutated code, it will trigger error
      expect(loadCalled).toBe(true);
      expect(errorCalled).toBe(false);
      done();
    }, 100);
  });
});