import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with queue processing', () => {
  const testFile = path.join(__dirname, 'test-drain-queue.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should emit drain only when queue is empty after all writes complete', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writesCompleted = 0;
      const totalWrites = 3;

      db.on('drain', () => {
        drainCount++;
        // In original code, drain should only fire once after all writes
        // In mutated code (if true), it will fire multiple times
        if (drainCount > 1) {
          done(new Error('Drain event fired multiple times'));
          return;
        }
      });

      // Queue writes
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, `value${i}`, () => {
          writesCompleted++;
          if (writesCompleted === totalWrites) {
            setTimeout(() => {
              if (drainCount === 0) {
                done(new Error('Drain event never fired'));
              } else {
                done();
              }
            }, 50);
          }
        });
      }
    });
  });
});