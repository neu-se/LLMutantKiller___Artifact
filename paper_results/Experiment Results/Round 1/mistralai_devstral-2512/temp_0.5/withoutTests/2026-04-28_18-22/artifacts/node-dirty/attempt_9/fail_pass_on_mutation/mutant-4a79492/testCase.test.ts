import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event timing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should not emit drain when queue has items but writes are in flight', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writesCompleted = 0;
    const totalWrites = 3;

    db.on('load', () => {
      // Add multiple items to queue
      for (let i = 1; i <= totalWrites; i++) {
        db.set(`key${i}`, { value: i }, () => {
          writesCompleted++;
          if (writesCompleted === totalWrites) {
            setImmediate(() => {
              if (!drainEmitted) {
                done(new Error('Drain event was not emitted after all writes completed'));
              } else {
                done();
              }
            });
          }
        });
      }
    });

    db.on('drain', () => {
      drainEmitted = true;
      // In the mutated version, this will trigger even when queue has items
      if (db._queue.size > 0 || db._inFlightWrites > 0) {
        done(new Error('Drain emitted while queue or in-flight writes are not empty'));
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});