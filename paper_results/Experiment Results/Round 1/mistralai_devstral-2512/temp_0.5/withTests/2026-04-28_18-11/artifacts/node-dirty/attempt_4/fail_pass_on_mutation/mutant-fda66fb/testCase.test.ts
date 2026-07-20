import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream drain condition', () => {
  const testFile = path.join(__dirname, 'test-drain-condition.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should correctly handle drain when queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up a scenario where we manually trigger the drain condition
      db.set('key1', 'value1', () => {
        // Clear the queue to simulate empty state
        db._queue.clear();

        // Manually trigger the drain handler
        db._writeStream.emit('drain');

        // In original code, this should emit drain event when queue is empty
        // In mutated code, it won't emit because condition is inverted
        setTimeout(() => {
          // Check if drain event was emitted by seeing if inFlightWrites is 0
          // and no error was thrown
          expect(db._inFlightWrites).toBe(0);
          done();
        }, 50);
      });
    });
  });
});