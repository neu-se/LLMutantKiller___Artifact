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

  it('should emit drain event when queue is empty after write', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1', () => {
        // Wait for the write to complete and queue to be empty
        setImmediate(() => {
          // The queue should be empty now, so drain should be emitted
          db.once('drain', () => {
            // Verify that the queue is indeed empty
            expect(db.size()).toBe(1);
            done();
          });
        });
      });
    });
  }, 10000);
});