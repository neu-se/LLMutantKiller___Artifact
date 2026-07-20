import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits an error event with the correct event name when the read stream encounters an error', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a file with invalid JSON to trigger an error
    fs.writeFileSync(dbPath, 'Invalid JSON');

    let errorEmitted = false;
    let unexpectedEventEmitted = false;

    dirty.on('error', () => {
      errorEmitted = true;
    });
    dirty.on('', () => {
      unexpectedEventEmitted = true;
    });

    // Wait for the error event to be emitted
    await new Promise((resolve, reject) => {
      dirty.on('load', () => {
        if (errorEmitted && !unexpectedEventEmitted) {
          resolve();
        } else {
          reject(new Error('Expected an error event, but got an unexpected event'));
        }
      });
    });

    expect(errorEmitted).toBe(true);
    expect(unexpectedEventEmitted).toBe(false);

    fs.unlinkSync(dbPath);
  });
});