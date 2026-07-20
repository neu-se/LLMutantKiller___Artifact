import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission condition', () => {
  const testFile = path.join(__dirname, 'test-drain-condition.dirty');
  let db: any;

  beforeEach(() => {
    rimraf.sync(testFile);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain when inFlightWrites reaches zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writeCallbacksCompleted = 0;

      // Set up multiple writes to ensure we have inFlightWrites > 0
      db.set('key1', 'value1', () => {
        writeCallbacksCompleted++;
      });

      db.set('key2', 'value2', () => {
        writeCallbacksCompleted++;
      });

      db.set('key3', 'value3', () => {
        writeCallbacksCompleted++;
      });

      db.on('drain', () => {
        drainCount++;
        // In the original code, drain should only be emitted once when all writes complete
        // In the mutated code, drain would be emitted multiple times while writes are still in flight
        if (drainCount > 1) {
          done(new Error('Drain emitted multiple times while writes were still in flight'));
        } else if (writeCallbacksCompleted < 3) {
          done(new Error('Drain emitted before all write callbacks completed'));
        } else {
          // Verify all writes were actually completed
          setImmediate(() => {
            const content = fs.readFileSync(testFile, 'utf-8');
            const lines = content.trim().split('\n');
            if (lines.length !== 3) {
              done(new Error(`Expected 3 lines in file, got ${lines.length}`));
            } else {
              done();
            }
          });
        }
      });
    });
  });
});