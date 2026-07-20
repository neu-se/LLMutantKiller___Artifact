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

    let errorEmitted = false;
    let emptyStringEmitted = false;

    // Listen for error event with correct event name
    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeDefined();
      // Check if empty string event was also emitted (mutation)
      if (emptyStringEmitted) {
        done(new Error('Mutation detected: both "error" and "" events were emitted'));
      }
    });

    // Listen for empty string event to detect mutation
    db.on('', (err: Error) => {
      emptyStringEmitted = true;
      done(new Error('Mutation detected: error event emitted with empty string event name'));
    });

    // Wait for load event to ensure processing is complete
    db.on('load', () => {
      setImmediate(() => {
        if (!errorEmitted) {
          done(new Error('No error event was emitted for corrupted file'));
        } else {
          done();
        }
      });
    });
  });
});