import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event with write stream backpressure', () => {
  const testFile = path.join(__dirname, 'test-backpressure.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should correctly handle drain events during backpressure', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writeCount = 0;
      const totalWrites = 100;

      db.on('drain', () => {
        drainCount++;
        // In original code, drain should only fire when queue is actually empty
        // In mutated code (if true), it will fire immediately even with items in queue
        if (drainCount > 1) {
          done.fail('Drain event fired multiple times during backpressure');
          return;
        }

        if (writeCount === totalWrites) {
          expect(drainCount).toBe(1);
          done();
        }
      });

      // Rapidly queue many writes to trigger backpressure
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, `value${i}`);
        writeCount++;
      }
    });
  });
});