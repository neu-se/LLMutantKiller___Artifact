import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error event with correct message when corrupted row is encountered', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Create test directory if it doesn't exist
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Write a corrupted row to the database file
    fs.writeFileSync(dbPath, '{"key":"test"}\n{invalid json}\n', 'utf-8');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      // Verify the error message doesn't contain the mutant's string
      expect(err.message).not.toContain("Stryker was here!");
      expect(err.message).toContain("Could not load corrupted row");
      done();
    });

    db.on('load', () => {
      // This shouldn't be called when there's an error
      done(new Error("Database loaded successfully when it should have failed"));
    });
  });
});