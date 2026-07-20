import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission with corrupted data', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let db: any;

  beforeEach(() => {
    // Create a test file with corrupted JSON data
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}\n{"invalid":json}\n');
  });

  afterEach(() => {
    // Clean up the test file
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore errors
    }
  });

  it('should emit error event with correct event name when loading corrupted data', (done) => {
    db = new Dirty(testFile);

    let errorEmitted = false;
    let loadEmitted = false;

    // Listen for error event with correct event name
    db.on('error', (err: Error) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
    });

    // Listen for load event
    db.on('load', () => {
      loadEmitted = true;
    });

    // Check after a short delay to ensure events have been processed
    setTimeout(() => {
      expect(errorEmitted).toBe(true);
      expect(loadEmitted).toBe(false);
      done();
    }, 100);
  });
});