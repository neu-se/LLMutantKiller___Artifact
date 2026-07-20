import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with pending queue items', () => {
  it('should write all queued items to disk before closing when waitForDrain is true', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Create a large number of writes to force _waitForDrain = true,
    // leaving items in the queue when close() is called
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write enough data to trigger backpressure (_waitForDrain = true)
      // so that some items remain in _queue when close() is called
      const largeValue = 'x'.repeat(65536); // 64KB to trigger backpressure
      
      // These writes should fill the buffer and cause _waitForDrain = true
      // leaving subsequent keys in the queue
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, largeValue);
      }

      // Call close while queue likely still has items
      db.close();

      db.on('write_close', () => {
        // Reopen the database to verify all keys were persisted
        const db2 = new Dirty(dbPath);
        db2.on('load', (count: number) => {
          // All 20 keys should have been written
          expect(count).toBe(20);
          for (let i = 0; i < 20; i++) {
            expect(db2.get(`key${i}`)).toBe(largeValue);
          }
          db2.close();
          fs.rmSync(tmpDir, { recursive: true });
          done();
        });
      });
    });
  });
});