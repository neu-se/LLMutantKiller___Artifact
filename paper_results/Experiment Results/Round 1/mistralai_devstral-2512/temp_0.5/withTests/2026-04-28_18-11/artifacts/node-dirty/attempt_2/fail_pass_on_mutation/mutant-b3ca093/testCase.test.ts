import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('mutant-b3ca093 test case', () => {
  const testFile = path.join(__dirname, 'test-mutant.dirty');
  let db: Dirty;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should handle queue processing when waitForDrain is true but queue is not empty', (done) => {
    db = new Dirty(testFile);

    db.on('load', () => {
      // Force the write stream into a draining state
      const largeValue = 'x'.repeat(1024 * 1024); // Large value to fill buffer
      db.set('key1', largeValue);

      // Immediately queue another write while the first is still being processed
      db.set('key2', 'value2', (err) => {
        expect(err).toBeFalsy();
        expect(db.get('key2')).toBe('value2');
        done();
      });

      // The mutation would cause _flush to return early when waitForDrain is true
      // even if there are items in the queue, preventing key2 from being written
    });
  });
});