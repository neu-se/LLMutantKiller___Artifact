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

  it('should emit drain event when all writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, verify we can still write and get another drain
          db.set('key2', { value: 2 }, () => {
            // This should trigger another drain when complete
          });
        } else if (drainCount === 2) {
          // Verify the mutation by checking that drain is emitted correctly
          // when inFlightWrites reaches 0 (original) vs >0 (mutated)
          expect(db.size()).toBe(2);
          db.close();
          done();
        }
      });

      // First write
      db.set('key1', { value: 1 }, () => {
        // Callback fired, but drain should only fire when inFlightWrites reaches 0
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});