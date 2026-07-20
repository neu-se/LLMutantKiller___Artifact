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

  it('should not destroy writeStream when there are no pending writes', (done) => {
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Add some data to ensure writeStream is initialized
      db.set('test', { value: 1 }, () => {
        // Wait for write to complete
        db.once('drain', () => {
          // Verify writeStream exists before close
          expect(db._writeStream).not.toBeNull();

          // Close the database
          db.close();

          // In original code: writeStream should remain open
          // In mutated code: writeStream will be destroyed immediately
          setImmediate(() => {
            expect(db._writeStream).not.toBeNull();
            done();
          });
        });
      });
    });
  });
});