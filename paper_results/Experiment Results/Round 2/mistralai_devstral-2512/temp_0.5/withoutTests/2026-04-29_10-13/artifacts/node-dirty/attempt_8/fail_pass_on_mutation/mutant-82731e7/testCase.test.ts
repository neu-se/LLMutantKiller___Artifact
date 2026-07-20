import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should keep writeStream open when closing with no pending writes', (done) => {
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Verify writeStream exists before close
      expect(db._writeStream).not.toBeNull();

      // Close the database
      db.close();

      // In original code: writeStream should remain open (not destroyed)
      // In mutated code: writeStream will be destroyed immediately
      setImmediate(() => {
        // Check if writeStream still exists
        if (db._writeStream === null) {
          done(new Error('writeStream was destroyed when it should have remained open'));
        } else {
          done();
        }
      });
    });
  });
});