import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database error handling', () => {
  const testDbPath = path.join(__dirname, 'test-db.txt');
  let dirty: Dirty;

  beforeEach(() => {
    // Clean up any existing test file
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  afterEach(() => {
    // Clean up after tests
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  });

  it('should emit error event with proper event name when corrupted row is encountered', (done) => {
    // Create a test database file with a corrupted row
    const corruptedData = '{"key":"test"}\n{"invalid": json}\n';
    fs.writeFileSync(testDbPath, corruptedData);

    dirty = new Dirty(testDbPath);

    // Track both 'error' and empty string events
    let errorEventFired = false;
    let emptyEventFired = false;

    dirty.on('error', (err) => {
      errorEventFired = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
    });

    dirty.on('', (err) => {
      emptyEventFired = true;
    });

    dirty.on('load', () => {
      // This should not be reached if error occurs
      expect(false).toBe(true);
      done();
    });

    // Give some time for the stream to process
    setTimeout(() => {
      // Original code should emit 'error' event, not empty string event
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    }, 100);
  });
});