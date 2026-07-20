import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with backpressure handling', () => {
  const testFile = path.join(__dirname, 'test-backpressure.dirty');

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

  it('should not emit drain while queue still has items during backpressure', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writesCompleted = 0;
      const totalWrites = 100;

      db.on('drain', () => {
        drainCount++;
        // In original code, drain should only fire once after all writes
        // In mutated code (if true), it will fire immediately even with queue items
        if (drainCount > 1) {
          done(new Error('Drain event fired multiple times during backpressure'));
          return;
        }
      });

      // Queue many writes to trigger backpressure
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, `value${i}`, () => {
          writesCompleted++;
          if (writesCompleted === totalWrites) {
            setTimeout(() => {
              if (drainCount === 0) {
                done(new Error('Drain event never fired'));
              } else if (drainCount === 1) {
                done();
              }
            }, 200);
          }
        });
      }
    });
  });
});