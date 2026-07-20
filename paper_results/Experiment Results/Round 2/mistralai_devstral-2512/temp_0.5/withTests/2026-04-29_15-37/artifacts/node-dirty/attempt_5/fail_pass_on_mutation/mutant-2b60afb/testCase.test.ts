import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission behavior', () => {
  const testFile = path.join(__dirname, 'test-drain-behavior.dirty');

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should emit drain event when queue becomes empty after writes', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      let drainFired = false;
      const drainListener = () => {
        if (drainFired) return;
        drainFired = true;
        db.removeListener('drain', drainListener);
        done();
      };

      db.on('drain', drainListener);

      // Perform multiple writes that should empty the queue
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // The drain event should fire when queue is empty
        });
      });
    });
  });
});