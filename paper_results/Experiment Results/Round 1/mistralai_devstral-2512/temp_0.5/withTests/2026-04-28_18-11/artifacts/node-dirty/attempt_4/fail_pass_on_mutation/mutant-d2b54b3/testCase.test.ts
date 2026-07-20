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
      // Write enough data to trigger multiple flushes
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, `value${i}`);
      }

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
      });

      // Wait for all writes to complete
      setTimeout(() => {
        // The mutation prevents drain from being emitted when queue is empty
        // and inFlightWrites <= 0, so we verify it was emitted at least once
        expect(drainCount).toBeGreaterThan(0);
        done();
      }, 500);
    });
  });
});