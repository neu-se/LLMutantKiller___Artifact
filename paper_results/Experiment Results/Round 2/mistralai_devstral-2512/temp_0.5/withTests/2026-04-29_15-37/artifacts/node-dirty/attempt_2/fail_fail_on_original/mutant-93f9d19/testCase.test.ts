import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('error event emission on corrupted row', () => {
  const testFile = path.join(__dirname, 'test-corrupted.dirty');
  let errorEventFired = false;
  let errorEventName: string | null = null;

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
    errorEventFired = false;
    errorEventName = null;
  });

  it('should emit error event with correct event name when loading corrupted data', (done) => {
    const db = new Dirty(testFile);

    // Track all emitted events
    db.on('error', (err) => {
      errorEventFired = true;
      errorEventName = 'error';
    });

    db.on('load', () => {
      // This should not be reached if error event is properly emitted
      done(new Error('Load event fired instead of error event'));
    });

    // Use a different event name to detect the mutation
    db.on('', (err) => {
      errorEventFired = true;
      errorEventName = '';
    });

    // Give some time for the file to be processed
    setTimeout(() => {
      if (!errorEventFired) {
        done(new Error('No error event was emitted for corrupted data'));
      } else if (errorEventName === '') {
        done(new Error('Error event was emitted with empty string event name (mutation detected)'));
      } else if (errorEventName !== 'error') {
        done(new Error(`Unexpected event name: ${errorEventName}`));
      } else {
        done();
      }
    }, 100);
  });
});