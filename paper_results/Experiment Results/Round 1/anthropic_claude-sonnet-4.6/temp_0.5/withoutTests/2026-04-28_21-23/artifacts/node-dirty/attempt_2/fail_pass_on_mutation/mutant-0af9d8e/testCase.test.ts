import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event with file-backed database', () => {
  it('should emit drain event after all writes complete when write stream drains', async () => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${process.pid}-${Date.now()}.db`);

    try {
      const db = new Dirty(dbPath);

      // Wait for load event first
      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // Write enough data to potentially cause write stream backpressure, then drain
      // We'll write a large value to increase chance of triggering the drain path
      const largeValue = { data: 'x'.repeat(100000) };

      const drainPromise = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('drain event was never emitted - mutation likely present'));
        }, 5000);

        db.once('drain', () => {
          clearTimeout(timeout);
          resolve();
        });
      });

      db.set('bigKey', largeValue);

      await drainPromise;

      expect(db.get('bigKey')).toEqual(largeValue);

      await new Promise<void>((resolve) => {
        db.once('write_close', () => resolve());
        db.close();
      });
    } finally {
      try {
        fs.unlinkSync(dbPath);
      } catch {
        // ignore cleanup errors
      }
    }
  });
});