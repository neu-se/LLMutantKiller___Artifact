import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() waits for pending writes before closing', () => {
  it('should persist data written before close() is called', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-test-${Date.now()}-${Math.floor(Math.random() * 10000)}.dirty`);

    // Clean up any existing file
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Set values to create pending writes in the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.set('key3', 'value3');

      // Immediately close before drain - original code should wait for drain first
      db.close();
    });

    db.on('write_close', () => {
      // After the write stream is closed, open a new DB and verify data was persisted
      const db2 = new Dirty(file);
      db2.on('load', (length: number) => {
        try {
          expect(length).toBe(3);
          expect(db2.get('key1')).toBe('value1');
          expect(db2.get('key2')).toBe('value2');
          expect(db2.get('key3')).toBe('value3');

          // Cleanup
          db2.close();
          db2.on('write_close', () => {
            try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
            done();
          });
        } catch (err) {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          done(err);
        }
      });
    });
  });
});