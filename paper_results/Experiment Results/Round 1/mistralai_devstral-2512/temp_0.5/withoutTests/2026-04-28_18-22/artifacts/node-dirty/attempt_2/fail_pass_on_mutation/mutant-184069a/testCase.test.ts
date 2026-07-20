import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database file handling', () => {
  it('should emit error event when file exists but is corrupted', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const testFile = path.join(testDir, 'corrupted.db');

    // Ensure the directory exists and is clean
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Create a corrupted file (not empty but invalid JSON)
    fs.writeFileSync(testFile, 'corrupted data\n');

    const db = new Dirty(testFile);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      db.close();
      rimraf.sync(testDir);
      done();
    });

    db.on('load', () => {
      db.close();
      rimraf.sync(testDir);
      done(new Error('Should have emitted error event for corrupted file'));
    });
  });
});