import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event fires only when queue is empty after write stream drain', () => {
  it('should emit drain event only after all queued writes are flushed to disk', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 100000)}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      let drainCount = 0;
      const keysWritten: string[] = [];
      const totalKeys = 100;

      // Write many keys to increase chance of triggering backpressure
      // and to ensure the queue has multiple items
      for (let i = 0; i < totalKeys; i++) {
        const key = `key${i}`;
        const val = `${'x'.repeat(1000)}${i}`; // large-ish values
        db.set(key, val, () => {
          keysWritten.push(key);
        });
      }

      db.on('drain', () => {
        drainCount++;

        // When drain fires, all callbacks should have been called
        // meaning all keys should have been written
        try {
          expect(keysWritten.length).toBe(totalKeys);
          expect(db.get('key0')).toBe(`${'x'.repeat(1000)}0`);
          expect(db.get(`key${totalKeys - 1}`)).toBe(`${'x'.repeat(1000)}${totalKeys - 1}`);

          // Clean up
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });
  });
});