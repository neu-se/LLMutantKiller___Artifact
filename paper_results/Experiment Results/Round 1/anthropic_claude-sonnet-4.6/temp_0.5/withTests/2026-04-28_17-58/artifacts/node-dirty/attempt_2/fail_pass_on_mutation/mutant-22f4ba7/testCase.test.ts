import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should persist all data to disk when close() is called before drain', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-close-test-'));
    const file = path.join(tmpDir, 'pending.dirty');

    try {
      // Phase 1: write data and call close() immediately (before drain)
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => reject(new Error('Timeout in phase 1')), 5000);

        db.on('load', () => {
          db.set('alpha', 'one');
          db.set('beta', 'two');
          db.set('gamma', 'three');

          // Call close() immediately while writes are still in-flight
          // Original: defers close until drain event fires
          // Mutated: closes streams immediately, losing data
          db.close();
        });

        db.on('write_close', () => {
          clearTimeout(timeout);
          resolve();
        });

        db.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      // Phase 2: reload the db and verify all data was persisted
      const entries: Array<[string, string]> = [];
      await new Promise<void>((resolve, reject) => {
        const db2 = new Dirty(file);
        const timeout = setTimeout(() => reject(new Error('Timeout in phase 2')), 5000);

        db2.on('load', () => {
          db2.forEach((key: string, val: string) => {
            entries.push([key, val]);
          });
          clearTimeout(timeout);
          resolve();
        });

        db2.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      // All three entries must have been written to disk
      expect(entries).toHaveLength(3);
      const map = Object.fromEntries(entries);
      expect(map['alpha']).toBe('one');
      expect(map['beta']).toBe('two');
      expect(map['gamma']).toBe('three');
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) { /* ignore */ }
    }
  });
});