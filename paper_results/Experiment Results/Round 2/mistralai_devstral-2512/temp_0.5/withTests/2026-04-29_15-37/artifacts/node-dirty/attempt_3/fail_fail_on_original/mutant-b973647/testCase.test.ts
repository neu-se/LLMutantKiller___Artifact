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
      // Give time for potential empty string event to fire
      setImmediate(() => {
        if (emptyStringEventEmitted) {
          done(new Error('Mutation detected: both "error" and "" events were emitted'));
        } else {
          done();
        }
      });
    });

    // Listen for empty string event to detect mutation
    db.on('', (err: Error) => {
      emptyStringEventEmitted = true;
      if (errorEventEmitted) {
        done(new Error('Mutation detected: both "error" and "" events were emitted'));
      } else {
        done(new Error('Mutation detected: error event emitted with empty string event name'));
      }
    });

    // Timeout to fail the test if no error event is emitted
    setTimeout(() => {
      done(new Error('No error event was emitted'));
    }, 1000);
  });
});