import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('write stream drain behavior', () => {
  const testFile = path.join(__dirname, 'test-drain-behavior.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when write stream drains with empty queue', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to trigger write
      db.set('testKey', 'testValue');

      // Force the write stream to drain by setting a large value
      const largeValue = 'x'.repeat(10000);
      db.set('largeKey', largeValue);

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // At this point, the queue should be empty but the mutation would prevent _flush from being called
          // We need to verify that another drain event can still occur
          setImmediate(() => {
            if (drainCount >= 2) {
              done();
            } else {
              done(new Error('Expected additional drain event after queue became empty'));
            }
          });
        }
      });
    });
  });
});