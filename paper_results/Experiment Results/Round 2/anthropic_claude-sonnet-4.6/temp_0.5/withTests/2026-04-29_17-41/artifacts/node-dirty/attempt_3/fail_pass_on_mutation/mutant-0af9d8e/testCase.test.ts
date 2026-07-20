import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
// @ts-ignore
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const file = path.join(tmpDir, 'backpressure.dirty');

    try {
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => {
          reject(new Error('Timed out: drain event was never emitted'));
        }, 10000);

        db.on('load', () => {
          db.once('drain', () => {
            clearTimeout(timeout);
            resolve();
          });

          // Write many large records to force write stream backpressure
          // so that _waitForDrain becomes true and the stream drain event fires
          const largeValue = 'x'.repeat(65536);
          for (let i = 0; i < 50; i++) {
            db.set(`key${i}`, largeValue);
          }
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
    }
  });
});