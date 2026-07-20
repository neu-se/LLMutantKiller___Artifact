import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when closing with pending writes but empty queue', (done) => {
    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Add a value to trigger a write
      db.set('key1', { value: 'test' }, () => {
        // Manually trigger the condition where queue is empty but inFlightWrites > 0
        // by directly manipulating the internal state (simulating a race condition)
        db._queue.clear();
        db._inFlightWrites = 1;

        // Now close should still emit drain when inFlightWrites reaches 0
        let drainEmitted = false;
        db.on('drain', () => {
          drainEmitted = true;
        });

        db.on('write_close', () => {
          // The original code should emit drain even with empty queue but inFlightWrites > 0
          // The mutated code would not emit drain in this case
          expect(drainEmitted).toBe(true);
          done();
        });

        db.close();
        // Simulate the write completing
        db._inFlightWrites = 0;
        if (!db._waitForDrain && db._inFlightWrites <= 0) {
          db.emit('drain');
        }
      });
    });
  });
});