import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() defers until drain when writes are pending', () => {
  it('should emit drain before write_close when close() is called with pending writes', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-order-test-'));
    const file = path.join(tmpDir, 'order.dirty');

    try {
      const events: string[] = [];

      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);

        db.on('load', () => {
          // Set a value so there are pending/in-flight writes
          db.set('key', 'value');

          // Immediately call close() before drain fires
          db.close();
        });

        db.on('drain', () => {
          events.push('drain');
        });

        db.on('write_close', () => {
          events.push('write_close');
          clearTimeout(timeout);
          resolve();
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      // Original: drain fires first (close() defers until after drain, then calls close() again)
      // Mutated: close() runs immediately without waiting, write_close may fire without drain
      expect(events).toContain('drain');
      expect(events).toContain('write_close');
      const drainIndex = events.indexOf('drain');
      const writeCloseIndex = events.indexOf('write_close');
      expect(drainIndex).toBeLessThan(writeCloseIndex);
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) { /* ignore */ }
    }
  });
});