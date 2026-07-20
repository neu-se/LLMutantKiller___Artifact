import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event', () => {
  const testDbPath = path.join(__dirname, 'test-db-mutant-2b60afb');
  let dirty: any;

  beforeEach(() => {
    dirty = new (require("../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js"))(testDbPath);
  });

  afterEach(() => {
    dirty.close();
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should emit drain event when queue is empty and inFlightWrites reaches zero', (done) => {
    let drainCount = 0;
    let writeCompleted = false;

    dirty.on('drain', () => {
      drainCount++;
      if (writeCompleted && drainCount === 1) {
        done();
      }
    });

    dirty.set('key1', { value: 'test1' }, () => {
      writeCompleted = true;
      // In the original code, drain should be emitted here
      // In the mutated code, the condition is always false so drain won't be emitted
      setTimeout(() => {
        if (!drainCount) {
          done(new Error('drain event was not emitted when expected'));
        }
      }, 50);
    });
  });
});