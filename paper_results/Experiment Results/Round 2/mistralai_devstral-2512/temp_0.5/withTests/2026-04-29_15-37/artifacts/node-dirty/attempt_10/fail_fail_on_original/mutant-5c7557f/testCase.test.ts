import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission after write stream drain', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should emit drain event when write stream drains with empty queue', (done) => {
    const db = new Dirty(testFile);
    let drainCount = 0;

    db.on('load', () => {
      // Set initial value
      db.set('key1', 'value1', () => {
        // Force drain by writing large data
        const largeValue = 'x'.repeat(1024 * 1024);
        db.set('key2', largeValue);

        db.on('drain', () => {
          drainCount++;
          if (drainCount === 1) {
            // Now set another value to trigger the mutation difference
            db.set('key3', 'value3');
          } else if (drainCount === 2) {
            done();
          }
        });
      });
    });

    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 3000);
  });
});