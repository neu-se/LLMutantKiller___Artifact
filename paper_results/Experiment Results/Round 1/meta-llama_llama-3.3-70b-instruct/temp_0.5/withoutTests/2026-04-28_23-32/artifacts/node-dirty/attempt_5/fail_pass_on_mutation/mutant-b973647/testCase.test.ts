import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits an error event with the correct event name when the read stream encounters an error', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a file with invalid JSON to trigger an error
    fs.writeFileSync(dbPath, 'Invalid JSON');

    let errorEventName: string | null = null;
    let unexpectedEventName: string | null = null;

    dirty.on('error', (err) => {
      errorEventName = 'error';
    });
    dirty.on('', (err) => {
      unexpectedEventName = '';
    });

    // Wait for the error event to be emitted
    await new Promise((resolve, reject) => {
      dirty.on('load', () => {
        if (errorEventName === 'error' && unexpectedEventName === null) {
          resolve();
        } else if (unexpectedEventName !== null) {
          reject(new Error('Unexpected event emitted'));
        } else {
          reject(new Error('Expected an error event, but got a load event'));
        }
      });
    });

    fs.unlinkSync(dbPath);
  });
});