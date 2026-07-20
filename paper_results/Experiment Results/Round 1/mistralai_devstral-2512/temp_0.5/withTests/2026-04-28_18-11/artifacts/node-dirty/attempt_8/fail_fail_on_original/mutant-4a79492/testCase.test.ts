import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event with write stream backpressure', () => {
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

  it('should correctly handle drain events during backpressure conditions', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writesInProgress = 0;
      const totalWrites = 10;

      db.on('drain', () => {
        drainCount++;
        // In original code, drain should only fire when queue is empty
        // In mutated code (if true), it will fire immediately
        if (writesInProgress > 0 && drainCount > 0) {
          done(new Error('Drain event fired while writes still in progress'));
          return;
        }
      });

      // Queue writes to trigger backpressure
      for (let i = 0; i < totalWrites; i++) {
        writesInProgress++;
        db.set(`key${i}`, `value${i}`, () => {
          writesInProgress--;
          if (i === totalWrites - 1) {
            setTimeout(() => {
              if (drainCount === 0) {
                done(new Error('Drain event never fired'));
              } else if (drainCount === 1) {
                done();
              } else {
                done(new Error('Drain event fired multiple times'));
              }
            }, 100);
          }
        });
      }
    });
  });
});