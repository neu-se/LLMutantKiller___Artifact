import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event when write stream drains with empty queue', () => {
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
      db.set('largeKey', largeValue);

      let drainEmitted = false;
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Wait for the write stream to drain and check if drain was emitted
      setTimeout(() => {
        if (drainEmitted) {
          done();
        } else {
          done(new Error('Drain event was not emitted when queue became empty after write stream drain'));
        }
      }, 200);
    });
  });
});