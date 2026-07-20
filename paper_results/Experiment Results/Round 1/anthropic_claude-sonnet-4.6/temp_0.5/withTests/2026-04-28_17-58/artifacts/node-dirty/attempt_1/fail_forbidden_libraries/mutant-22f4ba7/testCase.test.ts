import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() waits for pending writes before closing', () => {
  it('should write all pending data to disk when close() is called while writes are in flight', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    try {
      // Create a db, wait for it to load, then set multiple values and immediately close
      await new Promise<void>((resolve, reject) => {
        const db = new Dirty(file);

        db.on('load', () => {
          // Set multiple keys to ensure there are pending writes
          db.set('key1', 'value1');
          db.set('key2', 'value2');
          db.set('key3', 'value3');

          // Call close() immediately - in original code, this should wait for drain
          // In mutated code, this will close streams prematurely
          db.close();
        });

        // Listen for write_close to know when the write stream is actually closed
        db.on('write_close', () => {
          resolve();
        });

        db.on('error', reject);

        // Timeout to prevent hanging
        setTimeout(() => reject(new Error('Timeout waiting for write_close')), 5000);
      });

      // Now reload the database from disk and verify all data was written
      const writtenData = await new Promise<{ key: string; val: string }[]>((resolve, reject) => {
        const db2 = new Dirty(file);
        db2.on('load', () => {
          const entries: { key: string; val: string }[] = [];
          db2.forEach((key: string, val: string) => {
            entries.push({ key, val });
          });
          db2.close();
          resolve(entries);
        });
        db2.on('error', reject);
        setTimeout(() => reject(new Error('Timeout loading db2')), 5000);
      });

      // All three keys should have been persisted to disk
      // The mutated code may close streams before all data is written
      expect(writtenData.length).toBe(3);
      
      const keys = writtenData.map(e => e.key).sort();
      expect(keys).toEqual(['key1', 'key2', 'key3']);
      
      const vals = writtenData.map(e => e.val).sort();
      expect(vals).toEqual(['value1', 'value2', 'value3']);
    } finally {
      rimrafSync(tmpDir);
    }
  });
});