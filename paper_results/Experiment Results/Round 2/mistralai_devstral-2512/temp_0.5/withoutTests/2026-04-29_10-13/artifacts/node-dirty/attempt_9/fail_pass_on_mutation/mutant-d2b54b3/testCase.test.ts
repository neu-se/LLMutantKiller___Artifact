import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty drain event emission', () => {
  const testDir = path.join(__dirname, 'test-dirty-drain');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when write stream drains with no in-flight writes and empty queue', (done) => {
    const dirty = new Dirty(dbPath);
    let drainEmitted = false;

    dirty.on('load', () => {
      // Set up drain listener
      dirty.on('drain', () => {
        drainEmitted = true;
      });

      // Write enough data to trigger backpressure
      for (let i = 0; i < 100; i++) {
        dirty.set(`key${i}`, { value: 'x'.repeat(1000) });
      }

      // Wait for all writes to complete
      setTimeout(() => {
        // Clear the queue and ensure no in-flight writes
        dirty._queue.clear();
        dirty._inFlightWrites = 0;

        // Manually trigger drain event
        dirty._writeStream.emit('drain');

        // Verify drain was emitted
        setTimeout(() => {
          expect(drainEmitted).toBe(true);
          dirty.close();
          done();
        }, 100);
      }, 300);
    });
  });
});