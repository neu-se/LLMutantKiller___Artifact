import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('error event emission on corrupted row', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let errorEventFired = false;
  let errorMessage: string | null = null;

  beforeEach(() => {
    // Create a file with a corrupted row (incomplete JSON)
    fs.writeFileSync(testFile, '{"key":"test","val":"data"');
  });

  afterEach(() => {
    rimraf.sync(testFile);
    errorEventFired = false;
    errorMessage = null;
  });

  it('should emit error event with correct event name when loading corrupted data', (done) => {
    const db = new Dirty(testFile);

    db.on('error', (err) => {
      errorEventFired = true;
      errorMessage = err.message;
    });

    db.on('load', () => {
      // This should not be reached if error event is properly emitted
      done(new Error('Load event fired instead of error event'));
    });

    // Give some time for the file to be processed
    setTimeout(() => {
      if (!errorEventFired) {
        done(new Error('Error event was not emitted for corrupted data'));
      } else if (!errorMessage?.includes('Corrupted row at the end of the db')) {
        done(new Error('Error message does not match expected format'));
      } else {
        done();
      }
    }, 100);
  });
});