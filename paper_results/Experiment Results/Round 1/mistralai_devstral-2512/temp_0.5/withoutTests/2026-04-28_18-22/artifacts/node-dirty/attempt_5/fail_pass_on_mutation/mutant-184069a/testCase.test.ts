import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database ENOENT handling', () => {
  it('should emit load event for ENOENT but not emit error', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const nonExistentFile = path.join(testDir, 'nonexistent.db');

    // Setup test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(nonExistentFile);

    let loadEmitted = false;
    let errorEmitted = false;

    db.on('load', (size) => {
      loadEmitted = true;
      expect(size).toBe(0);
      // Give time for any potential error event to fire
      setTimeout(() => {
        expect(errorEmitted).toBe(false);
        db.close();
        fs.rmSync(testDir, { recursive: true });
        done();
      }, 100);
    });

    db.on('error', (err) => {
      errorEmitted = true;
      db.close();
      fs.rmSync(testDir, { recursive: true });
      done(new Error(`Unexpected error emitted for ENOENT: ${err.message}`));
    });
  });
});