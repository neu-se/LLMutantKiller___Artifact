import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should not emit error event for ENOENT but should for other errors', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const nonExistentFile = path.join(testDir, 'nonexistent.db');
    const invalidFile = path.join(testDir, 'invalid.db');

    // Setup test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create an invalid database file (empty file)
    fs.writeFileSync(invalidFile, '');

    const db1 = new Dirty(nonExistentFile);
    const db2 = new Dirty(invalidFile);

    let db1Load = false;
    let db1Error = false;
    let db2Error = false;

    db1.on('load', (size) => {
      db1Load = true;
      expect(size).toBe(0);
      checkCompletion();
    });

    db1.on('error', (err) => {
      db1Error = true;
      db1.close();
      db2.close();
      fs.rmSync(testDir, { recursive: true });
      done(new Error(`Unexpected error for ENOENT: ${err.message}`));
    });

    db2.on('error', (err) => {
      db2Error = true;
      expect(err).toBeInstanceOf(Error);
      checkCompletion();
    });

    function checkCompletion() {
      if (db1Load && db2Error) {
        expect(db1Error).toBe(false);
        db1.close();
        db2.close();
        fs.rmSync(testDir, { recursive: true });
        done();
      }
    }
  });
});