import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database queue processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should process queue correctly when drain event occurs', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;
    let drainCount = 0;
    let writeCount = 0;

    db.on('load', () => {
      loadCount++;
      if (loadCount === 1) {
        // Write multiple entries to fill the queue
        db.set('key1', { value: 1 }, () => {
          writeCount++;
          db.set('key2', { value: 2 }, () => {
            writeCount++;
            db.set('key3', { value: 3 }, () => {
              writeCount++;
              // After all writes complete, check if drain was emitted
              setImmediate(() => {
                if (drainCount === 0) {
                  done(new Error('Drain event was not emitted'));
                } else if (writeCount !== 3) {
                  done(new Error('Not all writes completed'));
                } else {
                  // Verify the queue is empty
                  const queueSize = db._queue.size;
                  if (queueSize !== 0) {
                    done(new Error(`Queue should be empty but has ${queueSize} items`));
                  } else {
                    done();
                  }
                }
              });
            });
          });
        });
      }
    });

    db.on('drain', () => {
      drainCount++;
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});