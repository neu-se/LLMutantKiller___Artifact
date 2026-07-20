import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;
    let drainCount = 0;

    db.on('load', () => {
      loadCount++;
      if (loadCount === 1) {
        // Write multiple entries to trigger the drain logic
        db.set('key1', { value: 1 }, () => {
          db.set('key2', { value: 2 }, () => {
            db.set('key3', { value: 3 }, () => {
              // After all writes complete, drain should be emitted
              setImmediate(() => {
                if (drainCount === 0) {
                  done(new Error('Drain event was not emitted'));
                }
              });
            });
          });
        });
      }
    });

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        done();
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});