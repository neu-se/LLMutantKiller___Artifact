import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should handle corrupted rows without mutant string in return value', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Write a database file with a corrupted row
    fs.writeFileSync(dbPath, '{"key":"test","val":1}\n{invalid json}\n{"key":"test2","val":2}\n', 'utf-8');

    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      expect(err.message).toContain("Could not load corrupted row");
    });

    db.on('load', (count) => {
      // Verify we got exactly one error for the corrupted row
      expect(errorCount).toBe(1);

      // Verify valid rows were loaded
      expect(db.get('test')).toBe(1);
      expect(db.get('test2')).toBe(2);

      // The mutant changes the return value which affects processing
      // This test verifies the correct behavior by checking the loaded data
      done();
    });
  });
});