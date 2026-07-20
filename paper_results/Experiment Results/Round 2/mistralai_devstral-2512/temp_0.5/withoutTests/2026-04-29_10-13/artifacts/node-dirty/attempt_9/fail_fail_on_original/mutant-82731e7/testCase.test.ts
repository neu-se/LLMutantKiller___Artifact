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

  it('should not destroy writeStream when closing with no pending writes', (done) => {
    const db = new Dirty(dbPath);
    let writeCloseCount = 0;

    db.on('load', () => {
      db.on('write_close', () => {
        writeCloseCount++;
      });

      // Close the database
      db.close();

      // In original code: write_close should NOT be emitted (stream not destroyed)
      // In mutated code: write_close WILL be emitted (stream destroyed immediately)
      setTimeout(() => {
        expect(writeCloseCount).toBe(0);
        done();
      }, 50);
    });
  });
});