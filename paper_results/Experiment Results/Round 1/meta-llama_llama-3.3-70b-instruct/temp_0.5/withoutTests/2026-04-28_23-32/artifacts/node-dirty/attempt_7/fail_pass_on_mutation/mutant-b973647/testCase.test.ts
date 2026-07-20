import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits an error event with the correct event name when the read stream encounters an error', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a file with invalid JSON to trigger an error
    fs.writeFileSync(dbPath, 'Invalid JSON');

    let eventName: string | null = null;

    dirty.on('error', () => {
      eventName = 'error';
    });
    dirty.on('', () => {
      eventName = '';
    });

    // Wait for the error event to be emitted
    await new Promise((resolve) => {
      dirty.on('load', () => {
        if (eventName === 'error') {
          resolve();
        } else {
          throw new Error('Expected an error event, but got an unexpected event');
        }
      });
    });

    fs.unlinkSync(dbPath);
  });
});