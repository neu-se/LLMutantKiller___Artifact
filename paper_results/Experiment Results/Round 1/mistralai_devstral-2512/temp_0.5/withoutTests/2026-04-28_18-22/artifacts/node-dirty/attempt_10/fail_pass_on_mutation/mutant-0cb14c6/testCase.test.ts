import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with multiple writes', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when all writes complete and inFlightWrites reaches exactly zero', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCount = 0;
    const totalWrites = 5;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Perform multiple writes to ensure we test the exact condition
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: `test${i}` }, () => {
          writeCount++;
          if (writeCount === totalWrites) {
            // After all writes complete, verify drain was emitted
            setImmediate(() => {
              expect(drainCount).toBeGreaterThan(0);
              done();
            });
          }
        });
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});