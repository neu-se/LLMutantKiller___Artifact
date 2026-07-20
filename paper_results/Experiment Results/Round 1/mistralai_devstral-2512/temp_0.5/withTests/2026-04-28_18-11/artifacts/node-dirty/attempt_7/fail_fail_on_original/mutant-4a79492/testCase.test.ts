import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission timing with queue', () => {
  const testFile = path.join(__dirname, 'test-drain-timing.dirty');

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

  it('should emit drain only when queue is empty after backpressure', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      let allWritesCompleted = false;

      db.on('drain', () => {
        // In original code, this should only fire after all writes complete
        // In mutated code (if true), it will fire immediately
        if (!allWritesCompleted) {
          done(new Error('Drain event fired before all writes completed'));
          return;
        }
        if (drainFired) {
          done(new Error('Drain event fired multiple times'));
          return;
        }
        drainFired = true;
      });

      // Queue many writes to trigger backpressure
      for (let i = 0; i < 50; i++) {
        db.set(`key${i}`, `value${i}`, () => {
          if (i === 49) {
            allWritesCompleted = true;
            setTimeout(() => {
              if (!drainFired) {
                done(new Error('Drain event never fired'));
              } else {
                done();
              }
            }, 100);
          }
        });
      }
    });
  });
});