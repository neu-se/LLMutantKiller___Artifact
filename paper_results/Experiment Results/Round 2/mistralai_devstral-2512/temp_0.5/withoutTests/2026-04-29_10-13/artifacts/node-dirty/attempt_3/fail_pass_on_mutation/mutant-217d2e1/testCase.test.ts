import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  it('should properly handle corrupted rows and emit error events', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Write a database file with a corrupted row
    fs.writeFileSync(dbPath, '{"key":"valid","val":1}\n{invalid json}\n{"key":"another","val":2}\n', 'utf-8');

    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      // The error should contain information about the corrupted row
      expect(err.message).toContain("Could not load corrupted row");
      expect(err.message).toContain("{invalid json}");
    });

    db.on('load', (count) => {
      // Should still load valid rows
      expect(count).toBe(2);
      expect(db.get('valid')).toBe(1);
      expect(db.get('another')).toBe(2);

      // Should have emitted exactly one error
      expect(errorCount).toBe(1);
      done();
    });
  });
});