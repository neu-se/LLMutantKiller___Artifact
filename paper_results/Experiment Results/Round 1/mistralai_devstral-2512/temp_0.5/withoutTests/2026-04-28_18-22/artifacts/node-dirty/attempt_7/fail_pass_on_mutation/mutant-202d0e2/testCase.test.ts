import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write stream drain handling', () => {
  const testDbPath = path.join(__dirname, 'test-db-drain-handling.txt');
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

  it('should flush queued items when write stream drains', (done) => {
    let firstDrainFired = false;
    let secondDrainFired = false;
    let secondWriteCallbackFired = false;

    dirty.on('drain', () => {
      if (!firstDrainFired) {
        firstDrainFired = true;
        // Queue another write immediately after first drain
        dirty.set('key2', { data: 'test2' }, () => {
          secondWriteCallbackFired = true;
        });
      } else {
        secondDrainFired = true;
      }
    });

    // First write that might fill the buffer
    dirty.set('key1', { data: 'x'.repeat(10000) }, () => {
      // Wait for potential second drain
      setTimeout(() => {
        if (!secondWriteCallbackFired) {
          done(new Error('Second write callback never fired - queue not flushed after drain'));
        } else if (!secondDrainFired) {
          done(new Error('Second drain event never fired'));
        } else {
          done();
        }
      }, 200);
    });
  });
});