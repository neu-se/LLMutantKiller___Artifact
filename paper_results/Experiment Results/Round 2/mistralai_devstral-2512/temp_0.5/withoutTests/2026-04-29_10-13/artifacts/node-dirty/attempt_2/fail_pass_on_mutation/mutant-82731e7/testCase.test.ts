import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty close method behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should not destroy writeStream when no writes are pending', (done) => {
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
  });
});