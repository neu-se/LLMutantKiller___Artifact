import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event timing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should emit drain only when all writes complete and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCallbackCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;

        if (drainCount === 1) {
          // First drain should occur after all writes complete
          if (writeCallbackCount < 2) {
            done(new Error('drain emitted before all writes completed'));
            return;
          }

          // Verify the mutation by checking if drain is emitted again
          // when it shouldn't be (when queue is empty but inFlightWrites > 0)
          setImmediate(() => {
            if (drainCount > 1) {
              done(new Error('drain emitted multiple times incorrectly'));
              return;
            }
            db.close();
            done();
          });
        }
      });

      // First write
      db.set('key1', { value: 1 }, () => {
        writeCallbackCount++;
      });

      // Second write
      db.set('key2', { value: 2 }, () => {
        writeCallbackCount++;
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});