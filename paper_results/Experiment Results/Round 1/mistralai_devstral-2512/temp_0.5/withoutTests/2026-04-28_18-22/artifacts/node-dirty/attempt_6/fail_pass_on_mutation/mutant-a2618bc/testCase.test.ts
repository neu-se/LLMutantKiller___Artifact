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

  it('should properly handle write stream backpressure', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    const totalWrites = 100;
    let drainCount = 0;

    db.on('load', () => {
      db.on('drain', () => {
        drainCount++;
      });

      // Write data that will trigger backpressure
      for (let i = 0; i < totalWrites; i++) {
        const largeValue = { data: 'x'.repeat(10000) };
        db.set(`key${i}`, largeValue, (err: Error | null | undefined) => {
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

    db.on('error', (err: Error) => {
      done(err);
    });
  });
});