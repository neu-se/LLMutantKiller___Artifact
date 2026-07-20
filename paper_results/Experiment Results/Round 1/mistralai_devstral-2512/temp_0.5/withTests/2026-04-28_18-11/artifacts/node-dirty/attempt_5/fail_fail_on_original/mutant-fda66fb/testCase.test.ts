import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event on empty queue', () => {
  const testFile = path.join(__dirname, 'test-empty-queue-drain.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (e) {}
  });

  it('should emit drain event when queue becomes empty during write', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Set up a write operation
      db.set('key1', 'value1');

      // Force the write stream to be in drain state
      db._writeStream.write('test', () => {
        // Clear the queue to simulate empty state
        db._queue.clear();

        // Manually trigger drain on write stream
        db._writeStream.emit('drain');

        // Listen for drain event
        const drainListener = () => {
          db.off('drain', drainListener);
          done();
        };
        db.on('drain', drainListener);

        // Fail test if drain isn't emitted
        setTimeout(() => {
          db.off('drain', drainListener);
          done(new Error('drain event was not emitted when queue was empty'));
        }, 100);
      });
    });
  });
});