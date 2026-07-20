import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with exact write count', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites equals zero (not just negative)', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Write exactly one item
      db.set('key1', { value: 'test1' }, () => {
        // After callback, inFlightWrites should be exactly 0
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