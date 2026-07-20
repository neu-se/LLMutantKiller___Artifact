import { promises as fsp } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row error event', () => {
  it('should emit error event with corrupted row message when loading a file with an invalid JSON row', async () => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-corrupted-${Date.now()}.dirty`);

    // Write a file with a corrupted row (invalid JSON that doesn't have a 'key' field)
    await fsp.writeFile(file, 'this is not valid json\n', 'utf-8');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new (Dirty as any)(file);

        let errorReceived = false;

        db.on('error', (err: Error) => {
          errorReceived = true;
          if (err.message.includes('Could not load corrupted row')) {
            resolve();
          } else {
            reject(new Error(`Unexpected error message: ${err.message}`));
          }
        });

        db.on('load', () => {
          if (!errorReceived) {
            reject(new Error('Expected error event was not emitted for corrupted row'));
          }
        });

        // Timeout to fail if neither event fires
        setTimeout(() => {
          if (!errorReceived) {
            reject(new Error('Timed out waiting for error event'));
          }
        }, 2000);
      });
    } finally {
      try {
        await fsp.unlink(file);
      } catch (_) { /* ignore */ }
    }
  });
});