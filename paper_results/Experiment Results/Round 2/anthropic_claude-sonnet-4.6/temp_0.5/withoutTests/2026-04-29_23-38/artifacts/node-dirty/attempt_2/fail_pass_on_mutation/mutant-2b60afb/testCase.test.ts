import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream backpressure', () => {
  it('should emit drain event after queue is flushed following write stream backpressure', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-backpressure-test-${process.pid}.db`);

    try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Write a large number of large records to force backpressure on the write stream
      // This should cause _waitForDrain to become true, and then when the stream drains,
      // the original code emits 'drain' (if queue is empty), but the mutated code does not.
      const largeValue = 'x'.repeat(65536); // 64KB per record to force backpressure

      // Set _waitForDrain by writing many large records
      // We write them all before the flush can complete
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, { data: largeValue });
      }

      // The drain event should eventually be emitted once all writes complete
      // and the write stream drains with an empty queue
      const timeout = setTimeout(() => {
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done(new Error('drain event was never emitted - mutation likely present'));
      }, 8000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
        done();
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (e) { /* ignore */ }
      done(err);
    });
  }, 15000);
});