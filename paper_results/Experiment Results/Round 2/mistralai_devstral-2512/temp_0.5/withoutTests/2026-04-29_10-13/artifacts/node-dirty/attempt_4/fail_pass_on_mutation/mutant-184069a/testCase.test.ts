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

    dirty.on('load', (size) => {
      expect(size).toBe(0);

      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done();
    });

    dirty.on('error', (err) => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});