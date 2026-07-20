import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database file handling', () => {
  it('should emit load event when file does not exist (ENOENT)', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'nonexistent.db');

    // Ensure the directory exists and is clean
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(testFile);

    let loadEmitted = false;
    let errorEmitted = false;

    db.on('load', (size) => {
      loadEmitted = true;
      expect(size).toBe(0);
      expect(errorEmitted).toBe(false);
      db.close();
      rimraf.sync(testDir);
      done();
    });

    db.on('error', (err) => {
      errorEmitted = true;
      db.close();
      rimraf.sync(testDir);
      done(new Error('Should not emit error for ENOENT'));
    });
  });
});