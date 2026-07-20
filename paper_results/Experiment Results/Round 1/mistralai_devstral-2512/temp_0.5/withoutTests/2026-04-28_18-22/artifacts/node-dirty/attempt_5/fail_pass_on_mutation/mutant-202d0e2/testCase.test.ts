import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write stream drain behavior', () => {
  const testDbPath = path.join(__dirname, 'test-db-drain-behavior.txt');
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

  it('should process queued items when write stream drains', (done) => {
    let drainFired = false;
    let secondWriteProcessed = false;

    dirty.on('drain', () => {
      drainFired = true;
    });

    // First write that might fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      // Queue a second write while first is still processing
      dirty.set('key2', { data: 'test' }, () => {
        secondWriteProcessed = true;
      });

      // In original code: drain handler calls _flush() which processes key2
      // In mutated code: drain handler does nothing, key2 remains unprocessed
      setTimeout(() => {
        if (!secondWriteProcessed) {
          done(new Error('Second write was not processed due to missing _flush() call in drain handler'));
        } else if (!drainFired) {
          done(new Error('Drain event was not fired'));
        } else {
          done();
        }
      }, 200);
    });
  });
});