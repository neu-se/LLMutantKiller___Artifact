import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database file handling', () => {
  it('should emit load event with size 0 when file does not exist', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'nonexistent.db');

    // Ensure the directory exists and is clean
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(testFile);

    db.on('load', (size) => {
      expect(size).toBe(0);
      db.close();
      rimraf.sync(testDir);
      done();
    });

    db.on('error', (err) => {
      db.close();
      rimraf.sync(testDir);
      done(err);
    });
  });
});