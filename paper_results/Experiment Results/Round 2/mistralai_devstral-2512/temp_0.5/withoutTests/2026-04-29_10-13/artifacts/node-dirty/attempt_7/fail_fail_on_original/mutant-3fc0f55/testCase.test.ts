import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write stream drain handling', () => {
  it('should continue processing queue after drain event', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let firstDrain = false;
    let secondDrain = false;

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
      if (!firstDrain && db.size() >= 100) {
        firstDrain = true;
        // Queue should be processed after drain
        expect(db._queue.size).toBe(0);
        expect(db._waitForDrain).toBe(false);
      } else if (!secondDrain && db.size() >= 200) {
        secondDrain = true;
        expect(db._queue.size).toBe(0);
        db.close();
      }
    });

    db.on('write_close', () => {
      expect(firstDrain).toBe(true);
      expect(secondDrain).toBe(true);
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