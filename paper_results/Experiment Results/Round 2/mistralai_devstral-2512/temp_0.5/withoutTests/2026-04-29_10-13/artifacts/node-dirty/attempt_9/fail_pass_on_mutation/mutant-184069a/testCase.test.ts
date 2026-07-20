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
    let errorCount = 0;
    let loadCount = 0;

    dirty.on('error', (err) => {
      errorCount++;
      // In original code, ENOENT should NOT trigger error event
      // In mutated code, it will trigger error event
      if (err.code === 'ENOENT') {
        expect.fail('ENOENT should not trigger error event');
      }
    });

    dirty.on('load', (size) => {
      loadCount++;
      expect(size).toBe(0);
    });

    setTimeout(() => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });

      // Original code should emit load once, not error for ENOENT
      expect(loadCount).toBe(1);
      expect(errorCount).toBe(0);
      done();
    }, 100);
  });
});