import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database corrupted row handling', () => {
  it('should emit error with exact message format when corrupted row is encountered', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Write a database file with a corrupted row
    const corruptedRow = '{invalid json}';
    fs.writeFileSync(dbPath, `{"key":"valid","val":1}\n${corruptedRow}\n{"key":"test","val":2}\n`, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      // The exact error message format is important
      // The mutant changes the return value which affects this
      expect(err.message).toBe(`Could not load corrupted row: ${corruptedRow}`);
      done();
    });

    db.on('load', () => {
      done(new Error("Expected error event was not emitted"));
    });
  });
});