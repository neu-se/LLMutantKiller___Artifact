import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event fires after write stream drain when queue is empty', () => {
  it('should emit drain event after writing many keys that cause backpressure', async () => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 100000)}.dirty`);

    try {
      const db = new Dirty(file);

      await new Promise<void>((resolve) => db.on('load', resolve));

      // Write many large values to force the write stream to signal backpressure
      // This causes _waitForDrain to become true, which means the drain event
      // from the write stream handler is needed to emit the final 'drain'
      const numKeys = 1000;
      const largeValue = 'x'.repeat(10000);

      const drainPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('drain event never fired - mutation detected'));
        }, 5000);

        db.on('drain', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      for (let i = 0; i < numKeys; i++) {
        db.set(`key${i}`, largeValue);
      }

      await drainPromise;

      // Verify all data was written
      expect(db.get('key0')).toBe(largeValue);
      expect(db.get(`key${numKeys - 1}`)).toBe(largeValue);

      db.close();

      await new Promise<void>((resolve) => db.on('write_close', resolve));
    } finally {
      try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
    }
  });
});