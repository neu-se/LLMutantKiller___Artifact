import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-error.dirty');
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

  it('should emit error event with correct event name when file read fails', (done) => {
    // Create a corrupted file that will cause a parse error during load
    fs.writeFileSync(testFile, '{"key":"test"}\n{"corrupted": "data"\n');

    db = new Dirty(testFile);

    // Track which events were emitted
    let errorEventEmitted = false;
    let emptyStringEventEmitted = false;

    // Listen for error event with correct event name
    db.on('error', (err: Error) => {
      errorEventEmitted = true;
      expect(err).toBeDefined();
    });

    // Listen for empty string event to detect mutation
    db.on('', (err: Error) => {
      emptyStringEventEmitted = true;
    });

    // Wait for both load and potential error events
    db.on('load', () => {
      setImmediate(() => {
        if (emptyStringEventEmitted) {
          done(new Error('Mutation detected: empty string event was emitted'));
        } else if (!errorEventEmitted) {
          done(new Error('No error event was emitted for corrupted file'));
        } else {
          done();
        }
      });
    });

    // Timeout to fail the test if no events are emitted
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 1000);
  });
});