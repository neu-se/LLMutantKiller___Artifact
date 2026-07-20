import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write stream drain behavior with queued items', () => {
  const testDbPath = path.join(__dirname, 'test-db-drain-queue.txt');
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

  it('should flush queued items when write stream drains and queue has items', (done) => {
    let firstDrainFired = false;
    let secondWriteProcessed = false;

    dirty.on('drain', () => {
      if (!firstDrainFired) {
        firstDrainFired = true;
        // Queue another write immediately after first drain
        dirty.set('key2', { data: 'test2' }, () => {
          secondWriteProcessed = true;
        });
      }
    });

    // First write that might fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      // Wait for potential processing of queued items
      setTimeout(() => {
        if (!secondWriteProcessed) {
          done(new Error('Queued write was not processed - missing _flush() call in drain handler'));
        } else {
          done();
        }
      }, 200);
    });
  });
});