import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission with corrupted data', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');

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
    const db = new Dirty(testFile);

    // Track which events were emitted
    const events: string[] = [];

    db.on('error', (err: Error) => {
      events.push('error');
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
    });

    db.on('load', () => {
      events.push('load');
    });

    // Check after a short delay to ensure events have been processed
    setTimeout(() => {
      // The test should pass if 'error' event was emitted (original behavior)
      // The test should fail if 'error' event was not emitted (mutated behavior)
      expect(events).toContain('error');
      done();
    }, 100);
  }, 1000);
});