import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission on corrupted row', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');

  beforeEach(() => {
    // Create a file with a corrupted row (incomplete JSON)
    fs.writeFileSync(testFile, '{"key":"test","val":"data"');
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore errors if file doesn't exist
    }
  });

  it('should emit error event when loading corrupted data', (done) => {
    const db = new Dirty(testFile);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected error event to be emitted for corrupted data'));
      }
    });

    // Give some time for the file to be processed
    setTimeout(() => {
      if (!errorEmitted) {
        done(new Error('No error event was emitted for corrupted data'));
      }
    }, 100);
  });
});