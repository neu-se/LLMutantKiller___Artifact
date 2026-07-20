import { promises as fsPromises, unlinkSync, existsSync } from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains and there are no in-flight writes', async () => {
    const tmpDir = await fsPromises.mkdtemp(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(dbPath);

        db.on('error', (err: Error) => reject(err));

        db.on('load', () => {
          const timeout = setTimeout(() => {
            reject(new Error('Timed out waiting for drain event - mutation may be present'));
          }, 5000);

          db.once('drain', () => {
            clearTimeout(timeout);
            db.close();
          });

          db.on('write_close', () => resolve());

          // Write many large values to trigger write stream backpressure
          // This forces _writeStream.write() to return false, setting _waitForDrain = true
          // When the write stream later emits 'drain', the code path with the mutation is hit
          const largeValue = 'x'.repeat(65536);
          for (let i = 0; i < 30; i++) {
            db.set(`key${i}`, largeValue);
          }
        });
      });
    } finally {
      try {
        await fsPromises.rm(tmpDir, { recursive: true, force: true });
      } catch (_) {}
    }
  });
});