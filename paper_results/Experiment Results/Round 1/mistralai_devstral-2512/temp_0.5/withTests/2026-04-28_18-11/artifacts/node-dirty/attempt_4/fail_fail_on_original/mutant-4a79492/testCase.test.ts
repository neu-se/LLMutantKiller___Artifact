import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission timing', () => {
  const testFile = path.join(__dirname, 'test-drain-timing.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain only when queue is empty and no writes are in flight', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      let writeCompleted = false;

      db.on('drain', () => {
        // In original code, this should only fire after all writes complete
        // In mutated code (if true), it will fire immediately
        if (!writeCompleted) {
          done.fail('Drain event fired before writes completed');
          return;
        }
        drainFired = true;
      });

      // Queue multiple writes
      db.set('key1', 'value1');
      db.set('key2', 'value2', () => {
        writeCompleted = true;
        // Small delay to ensure drain would have fired if it was going to
        setTimeout(() => {
          if (!drainFired) {
            done.fail('Drain event never fired');
          } else {
            done();
          }
        }, 50);
      });
    });
  });
});