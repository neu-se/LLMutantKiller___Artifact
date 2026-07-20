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

  it('should emit drain event when queue becomes empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure the queue is not empty initially
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Wait for writes to complete
      setImmediate(() => {
        // Now the queue should be empty and drain should be emitted
        db.once('drain', () => {
          expect(db.size()).toBe(2);
          done();
        });
      });
    });
  });
});