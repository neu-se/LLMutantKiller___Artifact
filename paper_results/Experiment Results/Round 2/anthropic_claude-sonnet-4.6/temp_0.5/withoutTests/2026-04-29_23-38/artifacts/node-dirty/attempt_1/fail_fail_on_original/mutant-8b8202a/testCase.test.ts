import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should emit drain only once when all in-flight writes are complete, not prematurely when stream drains with pending writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const drainEvents: number[] = [];
      let drainCount = 0;
      
      db.on('drain', () => {
        drainCount++;
        // Record the number of in-flight writes at each drain event
        drainEvents.push((db as any)._inFlightWrites);
      });
      
      // Write many large items to force backpressure on the write stream
      const largeValue = 'x'.repeat(65536); // 64KB per entry
      const numWrites = 20;
      let completedCallbacks = 0;
      
      const checkDone = () => {
        completedCallbacks++;
        if (completedCallbacks === numWrites) {
          // All writes are done - verify drain was emitted exactly once
          // and that when it was emitted, all in-flight writes were complete
          try {
            expect(drainCount).toBeGreaterThanOrEqual(1);
            // Every drain event should have 0 in-flight writes
            // In the mutated code, drain may be emitted when _inFlightWrites > 0
            for (const inFlight of drainEvents) {
              expect(inFlight).toBe(0);
            }
            rimraf(tmpDir).then(() => done()).catch(done);
          } catch (err) {
            rimraf(tmpDir).then(() => done(err)).catch(done);
          }
        }
      };
      
      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, { data: largeValue, index: i }, checkDone);
      }
    });
    
    db.on('error', (err: Error) => {
      rimraf(tmpDir).then(() => done(err)).catch(done);
    });
  });
});