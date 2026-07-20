import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission with invalid JSON', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Create a test file with corrupted JSON data
    fs.writeFileSync(testFile, '{"key":"test","val":"value"}\n{"invalid":json}\n');
  });

  afterEach(() => {
    // Clean up the test file
    rimraf.sync(testFile);
  });

  it('should emit error event with proper event name when loading corrupted data', (done) => {
    db = new Dirty(testFile);

    // Listen for error event with correct event name
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });

    // Listen for load event to ensure we don't complete prematurely
    db.on('load', () => {
      fail('Load event should not be emitted when there is corrupted data');
    });
  });
});