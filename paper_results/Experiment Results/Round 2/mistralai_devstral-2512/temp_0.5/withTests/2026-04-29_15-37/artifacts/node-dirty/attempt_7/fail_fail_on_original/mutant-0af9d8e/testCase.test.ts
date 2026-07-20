import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission condition', () => {
  const testFile = path.join(__dirname, 'test-drain-condition.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it('should emit drain only when all writes are completed', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writeCallbacksCompleted = 0;
      const totalWrites = 3;

      // Set up multiple writes
      for (let i = 1; i <= totalWrites; i++) {
        db.set(`key${i}`, `value${i}`, () => {
          writeCallbacksCompleted++;
        });
      }

      db.on('drain', () => {
        drainCount++;
        // In original code: drain emits when inFlightWrites <= 0
        // In mutated code: drain emits when inFlightWrites > 0 (prematurely)
        if (drainCount > 1) {
          done(new Error('Drain emitted multiple times'));
          return;
        }

        // Check if all writes completed before drain
        if (writeCallbacksCompleted < totalWrites) {
          done(new Error('Drain emitted before all writes completed'));
          return;
        }

        // Verify all writes were actually persisted
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