import { tmpdir } from 'os';
import { join } from 'path';
import { unlink } from 'fs/promises';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', async () => {
    const dbPath = join(tmpdir(), `dirty-drain-test-${process.pid}.db`);
    
    try {
      const db = new Dirty(dbPath);
      await new Promise<void>((resolve) => db.once('load', () => resolve()));
      
      // Write data large enough to exceed the write stream's highWaterMark
      // This forces write() to return false, setting _waitForDrain=true
      // In this case, the 'drain' event must be emitted from the write stream's
      // 'drain' event handler (not from the write callback)
      // The mutation removes this emit, so the test will timeout on mutated code
      const largeValue = 'x'.repeat(64 * 1024); // 64KB exceeds default highWaterMark
      
      const drainEmitted = await new Promise<boolean>((resolve) => {
        const timeout = setTimeout(() => resolve(false), 8000);
        db.once('drain', () => {
          clearTimeout(timeout);
          resolve(true);
        });
        db.set('largeKey', largeValue);
      });
      
      expect(drainEmitted).toBe(true);
      
      db.close();
      await new Promise<void>((resolve) => db.once('write_close', resolve));
    } finally {
      try { await unlink(dbPath); } catch {}
    }
  });
});