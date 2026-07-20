import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('mutant-4a79492', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
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

  it('should not emit drain when queue has items after write stream drains', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set multiple values to ensure queue has items
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // Check if queue still has items (should be true)
          const queueSize = db._queue.size;
          if (queueSize > 0) {
            // Manually trigger the drain handler
            db._writeStream.emit('drain');

            // The mutation would incorrectly emit drain again
            setImmediate(() => {
              if (drainCount > 1) {
                done(new Error('Unexpected drain event when queue still has items'));
              } else {
                done();
              }
            });
          } else {
            done();
          }
        } else {
          done(new Error('Unexpected drain event'));
        }
      });
    });
  });
});