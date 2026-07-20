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

  it('should emit drain event when all writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // First drain should occur after initial writes
          expect(db.size()).toBe(2);
          // Queue should be empty now, so we expect another drain
          setImmediate(() => {
            expect(drainCount).toBe(2);
            done();
          });
        }
      });

      // Add multiple items to trigger flush
      db.set('key1', { value: 1 }, () => {});
      db.set('key2', { value: 2 }, () => {});
    });
  });
});