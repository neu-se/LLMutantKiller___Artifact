import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write stream drain handling', () => {
  it('should emit drain event when queue is empty after drain', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('load', () => {
      // Write enough data to potentially trigger drain
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Force flush to ensure we're testing the drain behavior
      db._flush();

      // Manually trigger drain event to test the handler
      db._writeStream.emit('drain');
    });

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // After first drain, queue should be empty and inFlightWrites should be 0
        expect(db._queue.size).toBe(0);
        expect(db._inFlightWrites).toBe(0);
        expect(db._waitForDrain).toBe(false);
        db.close();
      }
    });

    db.on('write_close', () => {
      expect(drainCount).toBeGreaterThan(0);
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