import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should properly break write loop when drain is needed', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    const totalWrites = 100;
    let drainEvents = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainEvents++;
      });

      // Force small write buffer to trigger drain more frequently
      const originalWrite = db._writeStream.write;
      db._writeStream.write = function(chunk, cb) {
        if (writeCount < 5) {
          // Simulate backpressure by returning false
          setImmediate(() => cb());
          return false;
        }
        return originalWrite.call(this, chunk, cb);
      };

      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: i }, (err) => {
          if (err) {
            done(err);
            return;
          }
          writeCount++;
          if (writeCount === totalWrites) {
            setTimeout(() => {
              db.close();
              expect(drainEvents).toBeGreaterThan(0);
              done();
            }, 100);
          }
        });
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});