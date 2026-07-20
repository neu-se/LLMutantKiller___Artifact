import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database corrupted row handling', () => {
  it('should not include mutant string in error handler return value', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test file with corrupted data
    const testData = '{"key":"valid","val":1}\n{invalid json}\n{"key":"test","val":2}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    const db = new Dirty(dbPath);
    let errorMessage: string | null = null;

    db.on('error', (err) => {
      errorMessage = err.message;
    });

    db.on('load', () => {
      // Verify the error was emitted
      expect(errorMessage).not.toBeNull();
      expect(errorMessage).toContain("Could not load corrupted row");

      // The mutant changes the return value from '' to "Stryker was here!"
      // This affects the behavior when processing corrupted rows
      // The original code should still process valid rows correctly
      expect(db.get('valid')).toBe(1);
      expect(db.get('test')).toBe(2);

      // The mutant's string should not appear in any observable behavior
      expect(errorMessage).not.toContain("Stryker was here!");
      done();
    });
  });
});