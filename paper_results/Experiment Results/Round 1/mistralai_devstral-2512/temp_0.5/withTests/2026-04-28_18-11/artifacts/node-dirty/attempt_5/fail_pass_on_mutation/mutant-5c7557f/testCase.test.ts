import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission after write stream drain with empty queue', () => {
  const testFile = path.join(__dirname, 'test-drain-mutant.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when queue is empty after write stream drains', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Fill the write buffer to trigger drain
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      // Force a drain by setting a very large value
      const largeValue = 'x'.repeat(1000000);
      db.set('largeKey', largeValue, (err: any) => {
        if (err) return done(err);
      });

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        // The mutation prevents the drain event from being emitted when the queue is empty
        // after the write stream drains, so we expect at least one drain event
        if (drainCount >= 1) {
          done();
        }
      });

      // Fail the test if drain event is not emitted within a reasonable time
      setTimeout(() => {
        if (drainCount === 0) {
          done(new Error('Drain event was not emitted when queue became empty after write stream drain'));
        }
      }, 500);
    });
  });
});