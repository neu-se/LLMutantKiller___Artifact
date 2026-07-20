import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event condition', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event only when inFlightWrites is zero and queue is empty', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let writeCompleted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;

        if (drainCount === 1) {
          // First drain should occur after initial write completes
          if (!writeCompleted) {
            done(new Error('drain emitted before write completed'));
            return;
          }

          // Now trigger another write to test the mutation
          db.set('key2', { value: 2 }, () => {
            writeCompleted = true;
          });
        } else if (drainCount === 2) {
          // Second drain should occur after second write completes
          if (!writeCompleted) {
            done(new Error('drain emitted before second write completed'));
            return;
          }
          db.close();
          done();
        } else {
          // If we get here, drain was emitted too many times (mutation present)
          done(new Error('drain emitted too many times'));
        }
      });

      db.set('key1', { value: 1 }, () => {
        writeCompleted = true;
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});