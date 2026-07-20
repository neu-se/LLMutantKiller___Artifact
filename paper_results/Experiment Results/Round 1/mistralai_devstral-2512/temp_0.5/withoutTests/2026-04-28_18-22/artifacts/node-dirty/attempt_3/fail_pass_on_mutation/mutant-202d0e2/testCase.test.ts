import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write stream drain handling', () => {
  const testDbPath = path.join(__dirname, 'test-db-drain.txt');
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

  it('should properly handle drain event when write stream becomes available', (done) => {
    // Fill the write buffer to trigger drain behavior
    const largeValue = { data: 'x'.repeat(10000) }; // Large value to potentially fill buffer

    let drainFired = false;
    dirty.on('drain', () => {
      drainFired = true;
    });

    // First write that might fill the buffer
    dirty.set('key1', largeValue, () => {
      // After first write completes, check if drain was fired
      if (!drainFired) {
        // If drain wasn't fired yet, set another value to trigger flush
        dirty.set('key2', { data: 'test' }, () => {
          // In original code, this should trigger _flush() in drain handler
          // In mutated code, _flush() won't be called, causing different behavior
          setTimeout(() => {
            if (!drainFired) {
              done(new Error('Drain event was not fired when expected'));
            } else {
              done();
            }
          }, 100);
        });
      } else {
        done();
      }
    });
  });
});