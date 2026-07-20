import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty drain event after write stream backpressure', () => {
  it('should emit drain event when queue is empty after write stream drain event fires', async () => {
    const file = path.join(os.tmpdir(), `dirty-mutation-test-${process.pid}.dirty`);

    try {
      const db = new Dirty(file);

      await new Promise<void>((resolve) => db.on('load', resolve));

      // Write many large values to force write stream backpressure (_waitForDrain = true)
      // When the write stream emits 'drain', the original code checks if queue is empty
      // and emits 'drain'. The mutation uses `if (false)` so it never emits 'drain' from there.
      const largeValue = 'a'.repeat(65536); // 64KB per entry to force backpressure
      const numKeys = 20;

      const drainPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timed out waiting for drain event - likely mutation is active'));
        }, 10000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, largeValue);
      }

      await drainPromise;

      expect(db.get('key0')).toBe(largeValue);
      expect(db.get(`key${numKeys - 1}`)).toBe(largeValue);

      await new Promise<void>((resolve) => {
        db.close();
        db.on('write_close', resolve);
      });
    } finally {
      try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
    }
  });
});