import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  it('should emit error with specific message format when corrupted row is encountered', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Write a database file with a corrupted row
    const corruptedData = '{"key":"test","val":1}\n{invalid json}\n';
    fs.writeFileSync(dbPath, corruptedData, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      // The error message should contain the exact corrupted row
      expect(err.message).toBe(`Could not load corrupted row: {invalid json}`);

      // The mutant changes the return value which could affect error handling
      // This test verifies the exact error message format
      done();
    });

    db.on('load', () => {
      done(new Error("Expected error event was not emitted"));
    });
  });
});