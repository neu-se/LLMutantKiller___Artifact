import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission test', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  let db: any;

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

  it('should emit drain only when in-flight writes are complete', (done) => {
    db = new Dirty(testFile);
    let drainCount = 0;
    let callbackCount = 0;

    db.on('load', () => {
      // First write
      db.set('key1', 'value1', () => {
        callbackCount++;
      });

      // Second write
      db.set('key2', 'value2', () => {
        callbackCount++;
      });

      // Third write
      db.set('key3', 'value3', () => {
        callbackCount++;
      });

      // Listen for drain events
      db.on('drain', () => {
        drainCount++;
        // In the original code, drain should only emit once when all writes are complete
        // In the mutated code, drain will emit prematurely
        if (drainCount === 1 && callbackCount === 3) {
          // All callbacks should have been called before drain
          done();
        } else if (drainCount > 1) {
          // This should never happen in original code but will in mutated code
          done(new Error('Drain emitted multiple times'));
        }
      });
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 10000);
  });
});