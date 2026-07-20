import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission test', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, which is fine
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // File doesn't exist, which is fine
    }
  });

  it('should emit drain event when write stream drains with empty queue', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Write multiple values to ensure we have in-flight writes
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Track drain events
      let drainEmitted = false;
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Wait a bit to ensure all writes complete
      setTimeout(() => {
        // The mutation prevents drain from being emitted when queue is empty
        // and inFlightWrites <= 0, so we verify it was emitted
        expect(drainEmitted).toBe(true);
        done();
      }, 100);
    });
  });
});