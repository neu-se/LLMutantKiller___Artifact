import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write behavior', () => {
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

  it('should properly break write loop when waitForDrain is true', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    const totalWrites = 10;
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Force _waitForDrain to be true by simulating backpressure
      const originalWrite = db._writeStream.write;
      db._writeStream.write = function(chunk: any, cb: any) {
        if (writeCount < 3) {
          // Simulate backpressure by returning false
          setImmediate(() => cb && cb());
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
              expect(drainCount).toBeGreaterThan(0);
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