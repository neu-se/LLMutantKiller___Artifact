import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write stream drain handling', () => {
  it('should continue flushing queue after drain event', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let firstBatchWritten = false;
    let secondBatchWritten = false;

    db.on('load', () => {
      // Write first batch that will fill the buffer
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Force flush to trigger drain
      db._flush();

      // Write second batch after drain should be processed
      setImmediate(() => {
        for (let i = 100; i < 200; i++) {
          db.set(`key${i}`, { value: `data${i}` });
        }
        db._flush();
      });
    });

    db.on('drain', () => {
      if (!firstBatchWritten && db.size() >= 100) {
        firstBatchWritten = true;
        // Queue should still have items if drain handler is working correctly
        expect(db._queue.size).toBeGreaterThan(0);
      } else if (!secondBatchWritten && db.size() >= 200) {
        secondBatchWritten = true;
        expect(db._queue.size).toBe(0);
        db.close();
      }
    });

    db.on('write_close', () => {
      expect(firstBatchWritten).toBe(true);
      expect(secondBatchWritten).toBe(true);
      expect(db.size()).toBe(200);
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done();
    });

    db.on('error', (err) => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  });
});