import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event via write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    try {
      const db = new Dirty(dbPath);

      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // Write many large records to trigger backpressure (write() returns false)
      // This sets _waitForDrain = true, so when stream drains with empty queue,
      // the mutated code emits "" instead of "drain"
      const largeValue = 'x'.repeat(65536); // 64KB per record to fill stream buffer

      const drainReceived = await new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => {
          resolve(false);
        }, 5000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve(true);
        });

        // Write enough data to trigger backpressure
        for (let i = 0; i < 20; i++) {
          db.set(`key${i}`, { data: largeValue });
        }
      });

      expect(drainReceived).toBe(true);

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