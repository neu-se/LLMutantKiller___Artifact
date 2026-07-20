import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission after write operations', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
    db = new Dirty(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when queue is empty after write', (done) => {
    db.on('load', () => {
      const drainListener = () => {
        db.removeListener('drain', drainListener);
        done();
      };

      db.on('drain', drainListener);

      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // At this point, the queue should be empty, and drain should be emitted
        });
      });
    });
  });
});