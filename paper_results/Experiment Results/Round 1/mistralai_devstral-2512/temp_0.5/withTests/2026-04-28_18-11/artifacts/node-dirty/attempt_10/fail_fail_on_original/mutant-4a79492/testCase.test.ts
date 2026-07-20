import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with queue size check', () => {
  const testFile = path.join(__dirname, 'test-queue-size.dirty');

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

  it('should not emit drain when queue still has items', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      let writesCompleted = 0;
      const totalWrites = 5;

      db.on('drain', () => {
        // In original code, this should only fire after all writes
        // In mutated code (if true), it will fire immediately
        if (writesCompleted < totalWrites) {
          done(new Error('Drain event fired before all writes completed'));
          return;
        }
        if (drainFired) {
          done(new Error('Drain event fired multiple times'));
          return;
        }
        drainFired = true;
      });

      // Queue writes
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, `value${i}`, () => {
          writesCompleted++;
          if (writesCompleted === totalWrites) {
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