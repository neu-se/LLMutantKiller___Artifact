import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database write stream drain handling', () => {
  it('should properly handle drain events and flush remaining queue', (done) => {
    const testDir = path.join(__dirname, 'test-dirty-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up before test
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let allDataProcessed = false;

    db.on('load', () => {
      // Write enough data to potentially trigger drain
      for (let i = 0; i < 100; i++) {
        db.set(`key${i}`, { value: `data${i}` });
      }

      // Force flush to ensure we're testing the drain behavior
      db._flush();

      // Manually trigger drain event to test the handler
      setImmediate(() => {
        db._writeStream.emit('drain');
      });
    });

    db.on('drain', () => {
      drainEmitted = true;
      // After drain, if queue still has items, they should be flushed
      if (db._queue.size > 0) {
        allDataProcessed = false;
      } else {
        allDataProcessed = true;
        db.close();
      }
    });

    db.on('write_close', () => {
      expect(drainEmitted).toBe(true);
      expect(allDataProcessed).toBe(true);
      expect(db.size()).toBe(100);
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