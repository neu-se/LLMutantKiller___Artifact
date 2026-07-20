import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission in write stream', () => {
  const testFile = path.join(__dirname, 'test-write-stream-drain.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it('should emit drain when write stream is ready and queue is empty', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      // Force the write stream to backpressure by writing many large values
      const largeValue = 'x'.repeat(10000); // Large value to trigger backpressure
      let writesCompleted = 0;
      const totalWrites = 5;

      // Queue up multiple writes to fill the buffer
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, largeValue, () => {
          writesCompleted++;
        });
      }

      let drainCount = 0;
      db.on('drain', () => {
        drainCount++;
        // In original code: drain emits when inFlightWrites <= 0 AND queue is empty
        // In mutated code: drain emits when inFlightWrites > 0 (prematurely)
        if (drainCount > 1) {
          done(new Error('Drain emitted multiple times'));
          return;
        }

        // The key difference: in original code, drain should only fire
        // when all writes are actually completed (inFlightWrites <= 0)
        // In mutated code, it would fire while writes are still in flight
        if (writesCompleted < totalWrites) {
          done(new Error('Drain emitted while writes still in flight'));
          return;
        }

        // Verify all writes were persisted
        setImmediate(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');
          if (lines.length !== totalWrites) {
            done(new Error(`Expected ${totalWrites} lines, got ${lines.length}`));
          } else {
            done();
          }
        });
      });
    });
  });
});