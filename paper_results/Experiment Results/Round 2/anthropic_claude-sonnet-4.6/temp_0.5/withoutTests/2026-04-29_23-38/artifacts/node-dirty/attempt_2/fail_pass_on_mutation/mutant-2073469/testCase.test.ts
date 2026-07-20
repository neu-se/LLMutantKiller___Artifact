import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain event after writing data to file-backed database', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      const db = new Dirty(dbPath);

      // Wait for load event first
      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // Now write a value and wait for drain
      const drainReceived = await new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false);
        }, 3000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve(true);
        });

        db.set('testKey', { value: 'testValue' });
      });

      expect(drainReceived).toBe(true);

      // Clean up
      await new Promise<void>((resolve) => {
        db.close();
        db.once('write_close', () => resolve());
      });
    } finally {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        // ignore cleanup errors
      }
    }
  });
});