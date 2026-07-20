import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission test', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
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
      // Write enough data to trigger drain
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Force the write stream to drain by writing more data than the highWaterMark
      const largeValue = 'x'.repeat(10000);
      db.set('largeKey', largeValue);

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        // The mutation prevents drain from being emitted when queue is empty
        // and inFlightWrites <= 0, so we verify it's emitted at least once
        if (drainCount >= 1) {
          done();
        }
      });

      // Fail test if drain doesn't fire within reasonable time
      setTimeout(() => {
        done(new Error('drain event was not emitted'));
      }, 1000);
    });
  });
});