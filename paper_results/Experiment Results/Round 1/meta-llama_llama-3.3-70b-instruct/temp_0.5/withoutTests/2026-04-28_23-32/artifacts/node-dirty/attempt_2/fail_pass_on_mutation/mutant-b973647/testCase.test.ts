import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty', () => {
  it('emits an error event with the correct event name when the read stream encounters an error', async () => {
    const dbPath = 'test.db';
    const dirty = new Dirty(dbPath);

    // Create a file with invalid JSON to trigger an error
    fs.writeFileSync(dbPath, 'Invalid JSON');

    const errorEventName = new Promise((resolve, reject) => {
      dirty.on('error', (err) => {
        if (err) {
          resolve('error');
        }
      });
      dirty.on('load', () => {
        reject(new Error('Expected an error event, but got a load event'));
      });
    });

    await expect(errorEventName).resolves.toEqual('error');

    fs.unlinkSync(dbPath);
  });
});