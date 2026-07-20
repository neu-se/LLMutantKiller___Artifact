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
      dirty.on('drain', () => {
        drainEmitted = true;
      });

      // Write data to trigger drain
      dirty.set('key1', { value: 'test' });

      // Wait for the write to complete
      setTimeout(() => {
        // Clear the queue and ensure no in-flight writes
        dirty._queue.clear();
        dirty._inFlightWrites = 0;

        // Force drain by writing to stream
        dirty._writeStream.write('test', () => {
          setTimeout(() => {
            expect(drainEmitted).toBe(true);
            dirty.close();
            done();
          }, 50);
        });
      }, 100);
    });
  });
});