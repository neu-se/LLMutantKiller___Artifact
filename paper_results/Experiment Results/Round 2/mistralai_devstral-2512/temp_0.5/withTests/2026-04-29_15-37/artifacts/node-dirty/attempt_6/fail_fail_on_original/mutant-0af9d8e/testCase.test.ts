import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission condition', () => {
  const testFile = path.join(__dirname, 'test-drain-condition.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it('should emit drain when inFlightWrites reaches zero', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainEmitted = false;
      let writeCallbacksCompleted = 0;
      const totalWrites = 2;

      // First write
      db.set('key1', 'value1', () => {
        writeCallbacksCompleted++;
        // In original code, drain should NOT be emitted yet
        // because we still have another write in flight
        if (drainEmitted) {
          done(new Error('Drain emitted prematurely during first write'));
        }
      });

      // Second write
      db.set('key2', 'value2', () => {
        writeCallbacksCompleted++;
        // Both writes completed
        if (writeCallbacksCompleted === totalWrites && !drainEmitted) {
          // This is the expected behavior in original code
          // Drain should be emitted after all writes complete
        }
      });

      db.on('drain', () => {
        drainEmitted = true;
        // In original code: drain emits when inFlightWrites <= 0
        // In mutated code: drain emits when inFlightWrites > 0 (prematurely)
        if (writeCallbacksCompleted < totalWrites) {
          done(new Error('Drain emitted before all writes completed'));
        } else {
          done();
        }
      });
    });
  });
});