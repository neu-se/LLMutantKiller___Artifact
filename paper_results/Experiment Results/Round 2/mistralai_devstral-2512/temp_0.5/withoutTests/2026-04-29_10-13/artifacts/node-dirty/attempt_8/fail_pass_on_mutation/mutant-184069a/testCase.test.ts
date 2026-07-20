import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should handle ENOENT errors by emitting load event', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'missing.db');

    // Create test directory but don't create the file
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);
    let errorEventFired = false;
    let loadEventFired = false;

    dirty.on('error', (err) => {
      errorEventFired = true;
      // In original code, ENOENT should NOT trigger error event
      // In mutated code, it will trigger error event
      expect(err.code).not.toBe('ENOENT');
    });

    dirty.on('load', (size) => {
      loadEventFired = true;
      expect(size).toBe(0);
    });

    setTimeout(() => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });

      // Original code should emit load, not error for ENOENT
      expect(loadEventFired).toBe(true);
      expect(errorEventFired).toBe(false);
      done();
    }, 100);
  });
});