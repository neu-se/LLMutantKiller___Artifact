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

  it('should emit drain event when queue is empty after writes complete', (done) => {
    let drainEmitted = false;

    dirty.on('drain', () => {
      drainEmitted = true;
    });

    dirty.set('key1', { value: 'test1' }, () => {
      setTimeout(() => {
        if (!drainEmitted) {
          throw new Error('drain event was not emitted when queue became empty');
        }
        done();
      }, 100);
    });
  });
});