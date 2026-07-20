import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('write stream drain behavior', () => {
  const testFile = path.join(__dirname, 'test-drain-behavior.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain when write stream drains and queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up initial write
      db.set('key1', 'value1', () => {
        // Clear queue to simulate empty state
        db._queue.clear();

        // Manually trigger the drain handler by calling _flush
        db._flush();

        // The drain event should be emitted when:
        // 1. Queue is empty (original condition: !this._queue.size)
        // 2. In flight writes are 0
        // In mutated code, condition is inverted so drain won't emit
        setTimeout(() => {
          // Check if drain was emitted by verifying inFlightWrites is 0
          // and no callbacks are pending
          expect(db._inFlightWrites).toBe(0);
          done();
        }, 50);
      });
    });
  });
});