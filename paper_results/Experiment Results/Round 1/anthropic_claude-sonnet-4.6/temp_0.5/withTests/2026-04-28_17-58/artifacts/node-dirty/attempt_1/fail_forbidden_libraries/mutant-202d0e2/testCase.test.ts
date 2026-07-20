import { jest } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event triggers flush of remaining queue items', () => {
  it('should call all set callbacks even when write stream emits drain mid-flush', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Test timed out - not all callbacks were called (mutation detected)'));
        }, 5000);

        const db = new Dirty(file);

        db.on('load', () => {
          const totalKeys = 100;
          let callbackCount = 0;

          const checkDone = (err?: Error | null) => {
            if (err) {
              clearTimeout(timeout);
              reject(err);
              return;
            }
            callbackCount++;
            if (callbackCount === totalKeys) {
              clearTimeout(timeout);
              resolve();
            }
          };

          // Write many large values to force the write stream to buffer and emit drain
          // This ensures _waitForDrain gets set to true during _flush, leaving items in queue
          const largeValue = 'x'.repeat(65536); // 64KB per entry to overflow stream buffer

          for (let i = 0; i < totalKeys; i++) {
            db.set(`key${i}`, largeValue + i, checkDone);
          }
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    } finally {
      rimrafSync(tmpDir);
    }
  });
});