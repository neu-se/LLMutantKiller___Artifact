import * as fs from 'fs';
import * as path from 'path';
import Dirty from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('drain event emission', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

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

  it('should emit drain event when queue is empty after multiple writes', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // First drain after initial writes
          expect(db.size()).toBe(2);
          // Now remove all items to test queue empty condition
          db.rm('key1');
          db.rm('key2');
        } else if (drainCount === 2) {
          // Second drain after removals
          expect(db.size()).toBe(0);
          done();
        }
      });

      // Set multiple values
      db.set('key1', 'value1');
      db.set('key2', 'value2');
    });
  });
});