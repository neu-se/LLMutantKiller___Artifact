import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain event after writing to a file-backed database', async () => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.random().toString(36).slice(2)}.db`);

    try {
      const db = new Dirty(dbPath);

      // Wait for load event first
      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // Set a value and wait for drain
      const drainPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('drain event was never emitted'));
        }, 3000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      db.set('testKey', { value: 'testValue' });

      // This should resolve when drain is emitted
      await drainPromise;

      // Verify the value was stored correctly
      expect(db.get('testKey')).toEqual({ value: 'testValue' });

      // Close the database
      await new Promise<void>((resolve) => {
        db.once('write_close', () => resolve());
        db.close();
      });
    } finally {
      // Cleanup
      try {
        fs.unlinkSync(dbPath);
      } catch {
        // ignore cleanup errors
      }
    }
  });
});