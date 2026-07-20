import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event timing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event exactly once when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Write one item to trigger the flush mechanism
      db.set('key1', { value: 'test1' }, () => {
        // After the callback fires, we should have exactly one drain event
        setImmediate(() => {
          expect(drainCount).toBe(1);
          done();
        });
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});