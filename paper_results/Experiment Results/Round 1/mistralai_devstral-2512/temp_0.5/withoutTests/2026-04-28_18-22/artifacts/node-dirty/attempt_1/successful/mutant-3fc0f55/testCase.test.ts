import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event after large write completes', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Write enough data to trigger drain event
      const largeData = Array(1000).fill(0).map((_, i) => ({ key: `key${i}`, value: `value${i}` }));

      for (const item of largeData) {
        db.set(item.key, item.value, () => {
          // Callback for individual writes
        });
      }

      // The drain event should fire after all writes complete
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Verify all data was written
          expect(db.size()).toBe(1000);
          done();
        }
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});