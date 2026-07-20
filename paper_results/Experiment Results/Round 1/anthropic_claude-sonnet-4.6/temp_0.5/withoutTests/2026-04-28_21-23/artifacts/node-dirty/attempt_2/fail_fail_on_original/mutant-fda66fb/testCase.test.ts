import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream drain handling', () => {
  it('should emit drain only after all pending writes are flushed when backpressure occurs', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-drain-test-${process.pid}-${Date.now()}.db`);
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write large values to trigger backpressure on the write stream
      // When the OS stream drains, the dirty 'drain' event should only fire
      // after the queue is empty (all writes complete)
      const largeValue = 'x'.repeat(65536); // 64KB per entry to trigger backpressure
      const keys = Array.from({ length: 20 }, (_, i) => `key${i}`);
      let callbacksFired = 0;

      db.once('drain', () => {
        // At this point, the queue must be empty - all writes are done
        // Original: drain fires when !queue.size (queue is empty) ✓
        // Mutated: drain fires when queue.size (queue is NOT empty) ✗
        expect(db._queue.size).toBe(0);
        expect(db._inFlightWrites).toBe(0);

        // All callbacks should have fired before or at drain
        expect(callbacksFired).toBe(keys.length);

        db.close();
        db.once('write_close', () => {
          fs.unlink(dbPath, () => done());
        });
      });

      for (const key of keys) {
        db.set(key, { key, data: largeValue }, () => {
          callbacksFired++;
        });
      }
    });

    db.on('error', (err: Error) => {
      fs.unlink(dbPath, () => {});
      done(err);
    });
  }, 15000);
});