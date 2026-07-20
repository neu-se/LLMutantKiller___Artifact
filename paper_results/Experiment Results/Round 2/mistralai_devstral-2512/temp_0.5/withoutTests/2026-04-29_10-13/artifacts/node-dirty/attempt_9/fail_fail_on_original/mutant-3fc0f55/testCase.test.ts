import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write stream drain handling', () => {
  it('should process remaining queue items after drain event', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let firstBatchProcessed = false;
    let secondBatchProcessed = false;

    db.on('load', () => {
      // Write first batch that will fill the buffer
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Force flush to trigger drain
      db._flush();

      // Add more items to queue after flush
      setImmediate(() => {
        for (let i = 100; i < 150; i++) {
          db.set(`key${i}`, { value: `data${i}` });
        }
        db._flush();
      });
    });

    db.on('drain', () => {
      if (!firstBatchProcessed && db.size() >= 100) {
        firstBatchProcessed = true;
        // After first drain, queue should be processed
        expect(db._queue.size).toBe(0);
        expect(db._waitForDrain).toBe(false);
      } else if (!secondBatchProcessed && db.size() >= 150) {
        secondBatchProcessed = true;
        expect(db._queue.size).toBe(0);
        db.close();
      }
    });

    db.on('write_close', () => {
      expect(firstBatchProcessed).toBe(true);
      expect(secondBatchProcessed).toBe(true);
      expect(db.size()).toBe(150);
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done();
    });

    db.on('error', (err) => {
      // Clean up
      fs.rmSync(testDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});