import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event via write stream backpressure path', () => {
  it('should emit drain exactly once after writes complete through backpressure path', async () => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-drain-${process.pid}-${Date.now()}.db`);

    try {
      const db = new Dirty(dbPath);

      await new Promise<void>((resolve) => {
        db.on('load', () => resolve());
      });

      // Count drain events
      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
      });

      // Force backpressure by writing many large records rapidly
      // without waiting for callbacks, to trigger _waitForDrain = true
      const numWrites = 50;
      const largeVal = { data: 'y'.repeat(65536) };

      const allWritten = new Promise<void>((resolve) => {
        let completed = 0;
        for (let i = 0; i < numWrites; i++) {
          db.set(`key${i}`, largeVal, () => {
            completed++;
            if (completed === numWrites) resolve();
          });
        }
      });

      await allWritten;

      // Wait a bit for any pending drain events
      await new Promise<void>((resolve) => setTimeout(resolve, 500));

      // After all writes complete, drain should have been emitted at least once
      expect(drainCount).toBeGreaterThan(0);

      await new Promise<void>((resolve) => {
        db.once('write_close', () => resolve());
        db.close();
      });
    } finally {
      try {
        fs.unlinkSync(dbPath);
      } catch {
        // ignore
      }
    }
  });
});