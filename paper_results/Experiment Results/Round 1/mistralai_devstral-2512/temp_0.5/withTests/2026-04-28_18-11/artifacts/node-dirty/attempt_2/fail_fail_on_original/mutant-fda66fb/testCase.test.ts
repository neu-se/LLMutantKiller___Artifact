import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('write stream drain handling', () => {
  const testFile = path.join(__dirname, 'test-drain-handling.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should handle write stream drain correctly when queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force the write stream to be in a state where it needs to drain
      db._writeStream.cork();
      db._writeStream.write('test', () => {
        // Manually set queue to empty to trigger the drain condition
        db._queue.clear();

        // Spy on the drain event emission
        const drainSpy = jest.fn();
        db.on('drain', drainSpy);

        // Trigger the drain event by uncorking
        db._writeStream.uncork();

        // In the original code, drain should be emitted when queue is empty
        // In the mutated code, drain won't be emitted because the condition is inverted
        setTimeout(() => {
          expect(drainSpy).toHaveBeenCalled();
          done();
        }, 100);
      });
    });
  });
});