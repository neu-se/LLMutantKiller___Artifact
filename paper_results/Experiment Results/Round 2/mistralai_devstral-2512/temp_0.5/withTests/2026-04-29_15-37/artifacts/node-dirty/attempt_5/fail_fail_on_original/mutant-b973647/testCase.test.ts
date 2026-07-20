import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
  let db: any;
  let errorEventCount = 0;
  let emptyStringEventCount = 0;

  beforeEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
    errorEventCount = 0;
    emptyStringEventCount = 0;
  });

  afterEach(() => {
    if (fs.existsSync(testFile)) {
      fs.unlinkSync(testFile);
    }
  });

  it('should emit error event with correct event name when file read fails', (done) => {
    // Create a corrupted file that will cause a parse error during load
    fs.writeFileSync(testFile, '{"key":"test"}\n{"corrupted": "data"\n');

    db = new Dirty(testFile);

    // Listen for error event with correct event name
    db.on('error', (err: Error) => {
      errorEventCount++;
      expect(err).toBeDefined();
    });

    // Listen for empty string event to detect mutation
    db.on('', (err: Error) => {
      emptyStringEventCount++;
    });

    // Wait for load event to ensure processing is complete
    db.on('load', () => {
      // In original code, only 'error' event should be emitted
      // In mutated code, both 'error' and '' events would be emitted
      if (emptyStringEventCount > 0) {
        done(new Error(`Mutation detected: empty string event was emitted ${emptyStringEventCount} times`));
      } else if (errorEventCount === 0) {
        done(new Error('No error event was emitted'));
      } else {
        done();
      }
    });

    // Timeout to fail the test if no events are emitted
    setTimeout(() => {
      done(new Error('Test timed out - no events were emitted'));
    }, 1000);
  });
});