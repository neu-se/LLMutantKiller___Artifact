import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close method behavior', () => {
  it('should not destroy writeStream when no writes are pending', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    // Wait for the database to load
    db.on('load', () => {
      // Verify writeStream exists
      expect(db._writeStream).not.toBeNull();

      // Close the database
      db.close();

      // After close, writeStream should still exist (not destroyed)
      // because there are no pending writes
      setImmediate(() => {
        expect(db._writeStream).not.toBeNull();
        done();
      });
    });

    // Clean up
    afterAll(() => {
      rimraf.sync(testDir);
    });
  });
});