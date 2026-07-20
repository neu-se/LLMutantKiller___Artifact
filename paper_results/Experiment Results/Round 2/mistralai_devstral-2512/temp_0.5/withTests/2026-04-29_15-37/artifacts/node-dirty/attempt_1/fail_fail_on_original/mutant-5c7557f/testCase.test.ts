import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('drain event emission on write stream drain', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');
  beforeEach(() => {
    rimraf.sync(testFile);
  });
  afterEach(() => {
    rimraf.sync(testFile);
  });

  it('should emit drain event when write stream drains and queue is empty', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to trigger a write
      db.set('key1', 'value1', () => {
        // Manually trigger drain by writing enough data to fill the buffer
        // This ensures _waitForDrain becomes true and we test the drain event logic
        const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data to likely trigger drain
        db.set('key2', largeValue, () => {
          // After the large write completes, the drain event should fire
          // because the queue is now empty and inFlightWrites is 0
          db.on('drain', () => {
            // Verify the data was written correctly
            const data = fs.readFileSync(testFile, 'utf-8');
            const lines = data.trim().split('\n');
            expect(lines.length).toBeGreaterThanOrEqual(2);
            done();
          });
        });
      });
    });
  });
});