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
    let writeCloseEmitted = false;

    db.on('load', () => {
      // Add a write operation to ensure writeStream is active
      db.set('test', { value: 1 }, () => {
        // Wait for write to complete
        db.once('drain', () => {
          db.on('write_close', () => {
            writeCloseEmitted = true;
          });

          // Close the database
          db.close();

          // In original code: write_close should NOT be emitted immediately
          // In mutated code: write_close WILL be emitted immediately
          setTimeout(() => {
            expect(writeCloseEmitted).toBe(false);
            done();
          }, 100);
        });
      });
    });
  }, 1000);
});