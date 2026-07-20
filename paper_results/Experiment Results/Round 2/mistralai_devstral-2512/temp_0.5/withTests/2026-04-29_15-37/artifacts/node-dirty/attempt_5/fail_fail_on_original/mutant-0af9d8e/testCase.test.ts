import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('drain event emission timing', () => {
  const testFile = path.join(__dirname, 'test-drain-timing.dirty');
  let db: any;

  beforeEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  afterEach(() => {
    try { fs.unlinkSync(testFile); } catch (err) {}
  });

  it('should emit drain only after all writes complete', (done) => {
    db = new Dirty(testFile);
    db.on('load', () => {
      let drainCount = 0;
      let writeCallbacks = 0;
      const expectedWrites = 3;

      // Set up multiple writes
      for (let i = 1; i <= expectedWrites; i++) {
        db.set(`key${i}`, `value${i}`, () => {
          writeCallbacks++;
        });
      }

      db.on('drain', () => {
        drainCount++;
        // In original code: drain only emits when inFlightWrites <= 0
        // In mutated code: drain emits when inFlightWrites > 0 (prematurely)
        if (drainCount > 1) {
          done(new Error('Drain emitted multiple times'));
          return;
        }

        if (writeCallbacks < expectedWrites) {
          done(new Error('Drain emitted before all callbacks completed'));
          return;
        }

        // Verify all writes were actually persisted
        setImmediate(() => {
          const content = fs.readFileSync(testFile, 'utf-8');
          const lines = content.trim().split('\n');
          if (lines.length !== expectedWrites) {
            done(new Error(`Expected ${expectedWrites} lines, got ${lines.length}`));
          } else {
            done();
          }
        });
      });
    });
  });
});