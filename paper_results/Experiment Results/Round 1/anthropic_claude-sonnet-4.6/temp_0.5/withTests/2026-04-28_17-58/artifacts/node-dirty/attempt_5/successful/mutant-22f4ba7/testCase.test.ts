import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() defers when queue has pending items', () => {
  it('should call close again after drain when there are items in the queue', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-defer-test-'));
    const file = path.join(tmpDir, 'defer.dirty');

    try {
      // Track how many times close-related events fire
      let writeCloseCount = 0;

      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);

        db.on('load', () => {
          // Write many large values to force _waitForDrain = true
          // so that subsequent sets go into _queue but don't get flushed
          const largeVal = 'x'.repeat(65536); // 64KB to trigger backpressure
          
          // First write - may set _waitForDrain = true
          db.set('k1', largeVal);
          // These will be queued if _waitForDrain is true
          db.set('k2', largeVal);
          db.set('k3', largeVal);
          db.set('k4', largeVal);
          db.set('k5', largeVal);

          // Now call close() - queue likely still has items
          db.close();
        });

        db.on('write_close', () => {
          writeCloseCount++;
          clearTimeout(timeout);
          resolve();
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      // Reload and verify all 5 keys were persisted
      const keys: string[] = [];
      await new Promise<void>((resolve, reject) => {
        const db2 = new Dirty(file);
        const timeout = setTimeout(() => reject(new Error('Timeout loading')), 5000);

        db2.on('load', () => {
          db2.forEach((key: string) => { keys.push(key); });
          clearTimeout(timeout);
          resolve();
        });

        db2.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      // Original: all 5 keys persisted because close() waits for drain
      // Mutated: some keys lost because stream closed before queue flushed
      expect(keys.sort()).toEqual(['k1', 'k2', 'k3', 'k4', 'k5']);
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) { /* ignore */ }
    }
  });
});