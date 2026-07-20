import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission with empty queue', () => {
  const testFile = path.join(__dirname, 'test-drain-emission.dirty');
  let db: any;
  let drainEmitted = false;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
    drainEmitted = false;
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain event when write stream drains and queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up a write operation
      db.set('key1', 'value1', () => {
        // Clear the queue to simulate empty state
        db._queue.clear();

        // Manually trigger the drain handler
        db.on('drain', () => {
          drainEmitted = true;
        });

        // Force the write stream to emit drain
        db._writeStream.emit('drain');

        // In original code, drain should be emitted when queue is empty
        // In mutated code, the condition is inverted so drain won't be emitted
        setTimeout(() => {
          expect(drainEmitted).toBe(true);
          done();
        }, 50);
      });
    });
  });
});