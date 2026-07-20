import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should handle concurrent writes correctly when queue is full and drain is needed', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    const totalWrites = 100;

    db.on('load', () => {
      // Fill the queue with many writes to trigger the flush condition
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: i }, (err) => {
          if (err) {
            done(err);
            return;
          }
          writeCount++;
          if (writeCount === totalWrites) {
            // Verify all writes completed successfully
            expect(db.size()).toBe(totalWrites);
            db.close();
            done();
          }
        });
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});