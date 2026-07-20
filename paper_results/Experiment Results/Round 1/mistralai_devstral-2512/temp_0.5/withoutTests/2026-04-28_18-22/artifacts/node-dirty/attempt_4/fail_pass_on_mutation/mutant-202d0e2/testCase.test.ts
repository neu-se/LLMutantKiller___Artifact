import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with pending writes', () => {
  const testDbPath = path.join(__dirname, 'test-db-pending.txt');
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

  it('should emit drain event when write stream drains with pending queue items', (done) => {
    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
    });

    // First write to potentially fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      // Immediately queue another write while first is still in flight
      dirty.set('key2', { data: 'test' }, () => {
        // In original code: drain handler calls _flush() which processes key2
        // In mutated code: drain handler does nothing, key2 remains in queue
        setTimeout(() => {
          if (drainCount < 2) {
            done(new Error('Expected drain to fire twice (once for each flush)'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});