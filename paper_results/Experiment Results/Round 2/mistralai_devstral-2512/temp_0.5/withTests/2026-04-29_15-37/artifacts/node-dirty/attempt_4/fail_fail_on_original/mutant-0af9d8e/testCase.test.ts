import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission condition', () => {
  const testFile = path.join(__dirname, 'test-drain-condition.dirty');
  let db: any;

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore if file doesn't exist
    }
  });

  it('should emit drain only when all writes are completed', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainEmitted = false;
      let writeCallbacksCompleted = 0;

      // Set up multiple writes to ensure we have inFlightWrites > 0
      db.set('key1', 'value1', () => {
        writeCallbacksCompleted++;
        if (drainEmitted) {
          done(new Error('Drain emitted before first write callback completed'));
        }
      });

      db.set('key2', 'value2', () => {
        writeCallbacksCompleted++;
        if (drainEmitted) {
          done(new Error('Drain emitted before second write callback completed'));
        }
      });

      db.set('key3', 'value3', () => {
        writeCallbacksCompleted++;
        if (drainEmitted) {
          done(new Error('Drain emitted before third write callback completed'));
        }
      });

      db.on('drain', () => {
        drainEmitted = true;
        // In the original code, drain should only be emitted after all writes complete
        // In the mutated code, drain would be emitted while writes are still in flight
        if (writeCallbacksCompleted < 3) {
          done(new Error('Drain emitted before all write callbacks completed'));
        } else {
          done();
        }
      });
    });
  });
});