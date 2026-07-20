import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let db: Dirty;

  beforeEach(() => {
    // Create a corrupted database file with an incomplete row at the end
    const corruptedData = '{"key":"test","val":"data"}\n{"key":"corrupted","val":"incomplete';
    fs.writeFileSync(testFile, corruptedData);
  });

  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit error event with proper event name when loading corrupted data', (done) => {
    db = new Dirty(testFile);

    // Track both 'error' and empty string events to detect the mutation
    let errorEmitted = false;
    let emptyStringEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
    });

    db.on('', (err) => {
      emptyStringEmitted = true;
    });

    db.on('load', () => {
      // In the original code, only 'error' should be emitted
      // In the mutated code, both 'error' and '' would be emitted
      expect(errorEmitted).toBe(true);
      expect(emptyStringEmitted).toBe(false);
      done();
    });
  });
});