import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // First drain should occur after initial writes
          expect(db.size()).toBe(2);
          // Verify the drain event was emitted correctly
          done();
        }
      });

      // Write two items to trigger the flush mechanism
      db.set('key1', { value: 'test1' }, () => {});
      db.set('key2', { value: 'test2' }, () => {});
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});