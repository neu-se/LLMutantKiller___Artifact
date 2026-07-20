import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  it('should return empty string from error handler in data event', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Write a database file with a corrupted row
    fs.writeFileSync(dbPath, '{"key":"valid","val":1}\n{invalid json}\n', 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toContain("Could not load corrupted row");
    });

    db.on('load', () => {
      // The test should fail if no error was emitted (which would happen with the mutant)
      if (!errorEmitted) {
        done(new Error("Expected error event was not emitted"));
        return;
      }

      // Verify the database loaded the valid row
      expect(db.get('valid')).toBe(1);
      done();
    });
  });
});