import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() waits for pending writes before closing', () => {
  it('should persist all data to disk when close() is called with pending writes', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-close-test-${Date.now()}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set data and immediately call close() before drain fires
      // This means there are pending writes in the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Call close() immediately - with pending writes, original code should
      // wait for drain before closing; mutated code closes immediately
      db.close();

      // Listen for write_close to know when the write stream is actually closed
      db.on('write_close', () => {
        // Now read the file and verify all data was written
        try {
          const contents = fs.readFileSync(file, 'utf-8');
          const lines = contents.trim().split('\n').filter(l => l.length > 0);
          const records = lines.map(l => JSON.parse(l));

          // All three keys should have been written
          const keys = records.map((r: any) => r.key);
          expect(keys).toContain('key1');
          expect(keys).toContain('key2');
          expect(keys).toContain('key3');

          // Clean up
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done();
        } catch (err) {
          // Clean up
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });
  });
});