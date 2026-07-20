// testCase.test.ts
import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-corrupt.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Create a corrupted database file with an invalid JSON row
    const corruptedData = '{"key":"valid","val":"data"}\ninvalid json row\n';
    fs.writeFileSync(testFile, corruptedData);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event with correct event name when loading corrupted data', (done) => {
    db = new Dirty(testFile);

    // Listen for both 'error' and empty string events to detect the mutation
    const errorHandler = (err: Error) => {
      expect(err.message).toContain('Could not load corrupted row');
      done();
    };

    const emptyStringHandler = () => {
      // If this handler is called, the mutation is present
      fail('Empty string event was emitted instead of "error" event');
    };

    db.on('error', errorHandler);
    db.on('', emptyStringHandler);
  });
});