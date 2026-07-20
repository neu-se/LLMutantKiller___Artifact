import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with items still in queue', () => {
  it('should persist queued items added after first flush when close() is called', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-queue-test-'));
    const file = path.join(tmpDir, 'queue.dirty');

    try {
      // Phase 1: write data, then add more data while waiting for drain, then close
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);
        const timeout = setTimeout(() => reject(new Error('Timeout in phase 1')), 5000);

        db.on('load', () => {
          // First write - triggers _flush, sets _waitForDrain=true potentially
          db.set('first', '1');

          // Second write while first is in-flight - goes into queue
          // but _waitForDrain may block it from being flushed immediately
          db.set('second', '2');

          // Call close() immediately - queue still has 'second' if waitForDrain is true
          // Original: defers close until drain, then flushes remaining queue
          // Mutated: ends writeStream immediately, 'second' may never be written
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

      // Phase 2: reload and check
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

      // Both entries must be persisted
      expect(entries).toHaveLength(2);
      const map = Object.fromEntries(entries);
      expect(map['first']).toBe('1');
      expect(map['second']).toBe('2');
    } finally {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) { /* ignore */ }
    }
  });
});