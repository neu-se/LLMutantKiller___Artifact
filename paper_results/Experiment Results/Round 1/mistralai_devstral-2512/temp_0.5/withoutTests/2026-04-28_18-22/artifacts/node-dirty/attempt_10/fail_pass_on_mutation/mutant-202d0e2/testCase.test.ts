import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with pending writes', () => {
  const testDbPath = path.join(__dirname, 'test-db-pending-writes.txt');
  let dirty: any;

  beforeEach((done) => {
    dirty = new Dirty(testDbPath);
    dirty.on('load', () => {
      done();
    });
  });

  afterEach((done) => {
    dirty.close();
    rimraf(testDbPath, done);
  });

  it('should emit drain event and process queue when write stream drains', (done) => {
    let drainCount = 0;
    let secondWriteCompleted = false;

    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // Queue another write immediately after first drain
        dirty.set('key2', { data: 'test2' }, () => {
          secondWriteCompleted = true;
        });
      }
    });

    // First write that might fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      // Wait for potential second drain
      setTimeout(() => {
        if (!secondWriteCompleted) {
          done(new Error('Second write was not processed - missing _flush() call in drain handler'));
        } else if (drainCount < 2) {
          done(new Error('Expected second drain event after processing queued items'));
        } else {
          done();
        }
      }, 200);
    });
  });
});