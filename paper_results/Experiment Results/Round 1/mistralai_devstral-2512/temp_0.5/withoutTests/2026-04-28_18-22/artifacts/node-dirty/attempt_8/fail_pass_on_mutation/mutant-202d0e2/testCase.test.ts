import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with pending queue', () => {
  const testDbPath = path.join(__dirname, 'test-db-pending-queue.txt');
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

  it('should process queued items when write stream drains and queue is not empty', (done) => {
    let drainFired = false;
    let writeCallbackFired = false;

    dirty.on('drain', () => {
      drainFired = true;
      // At this point, the queue should be processed
      // In original code: _flush() is called which processes the queue
      // In mutated code: nothing happens, queue remains unprocessed
    });

    // First write that might fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      // Queue another write while first is processing
      dirty.set('key2', { data: 'test' }, () => {
        writeCallbackFired = true;
      });

      // Force a drain by writing more data
      dirty.set('key3', { data: 'y'.repeat(10000) }, () => {
        setTimeout(() => {
          if (!writeCallbackFired) {
            done(new Error('Queued write callback never fired - missing _flush() call in drain handler'));
          } else if (!drainFired) {
            done(new Error('Drain event never fired'));
          } else {
            done();
          }
        }, 100);
      });
    });
  });
});