import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with queued writes', () => {
  const testDbPath = path.join(__dirname, 'test-db-queued.txt');
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

  it('should process all queued writes when drain occurs', (done) => {
    let firstWriteCompleted = false;
    let secondWriteCompleted = false;
    let drainCount = 0;

    dirty.on('drain', () => {
      drainCount++;
    });

    // First write that might fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      firstWriteCompleted = true;

      // Queue second write immediately after first completes
      dirty.set('key2', { data: 'test' }, () => {
        secondWriteCompleted = true;
      });

      // Check state after a short delay
      setTimeout(() => {
        if (!secondWriteCompleted) {
          done(new Error('Second write callback never fired - queue not processed'));
        } else if (drainCount === 0) {
          done(new Error('Drain event never fired'));
        } else {
          done();
        }
      }, 100);
    });
  });
});