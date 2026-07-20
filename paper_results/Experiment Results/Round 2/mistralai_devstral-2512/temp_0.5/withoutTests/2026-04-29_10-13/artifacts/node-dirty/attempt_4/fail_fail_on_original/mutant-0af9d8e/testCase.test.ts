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

  it('should emit drain only when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let firstWriteDone = false;
    let secondWriteDone = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;

        if (drainCount === 1) {
          if (!firstWriteDone) {
            done(new Error('First drain emitted before first write completed'));
            return;
          }

          // Trigger second write
          db.set('key2', { value: 2 }, () => {
            secondWriteDone = true;
          });
        } else if (drainCount === 2) {
          if (!secondWriteDone) {
            done(new Error('Second drain emitted before second write completed'));
            return;
          }
          db.close();
          done();
        } else {
          done(new Error('Unexpected drain event'));
        }
      });

      // First write
      db.set('key1', { value: 1 }, () => {
        firstWriteDone = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});