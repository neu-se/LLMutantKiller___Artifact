import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission after write stream drain', () => {
  const testFile = path.join(__dirname, 'test-drain.dirty');

  beforeEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  afterEach(() => {
    try {
      fs.unlinkSync(testFile);
    } catch (err) {
      // Ignore error if file doesn't exist
    }
  });

  it('should emit drain event when write stream drains and queue becomes empty', (done) => {
    const db = new Dirty(testFile);
    db.on('load', () => {
      // Set a value to trigger a write
      db.set('key1', 'value1', () => {
        // Force the write stream to drain by writing a large amount of data
        // This will make _waitForDrain true and test the drain event logic
        const largeValue = 'x'.repeat(1024 * 1024); // 1MB of data
        db.set('key2', largeValue);

        // The drain event should fire when the write stream drains
        // and the queue is empty (which it will be after the large write completes)
        db.on('drain', () => {
          // Verify the data was written correctly
          const data = fs.readFileSync(testFile, 'utf-8');
          const lines = data.trim().split('\n');
          expect(lines.length).toBe(2);

          // This test will fail on the mutated code because the empty else block
          // won't properly trigger the _flush() call when queue is empty after drain
          done();
        });
      });
    });
  });
});