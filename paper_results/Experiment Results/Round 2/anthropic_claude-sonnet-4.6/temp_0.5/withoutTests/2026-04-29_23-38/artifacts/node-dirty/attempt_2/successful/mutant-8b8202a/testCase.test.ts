import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should only emit drain after all in-flight writes complete, not prematurely when stream backpressure resolves with pending writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Track drain events and the in-flight write count at each drain
      const inFlightAtDrain: number[] = [];

      db.on('drain', () => {
        inFlightAtDrain.push((db as any)._inFlightWrites);
      });

      // Write many large items to force write stream backpressure
      const largeValue = 'x'.repeat(65536); // 64KB per entry to force backpressure
      const numWrites = 30;
      let completedCallbacks = 0;

      const checkDone = () => {
        completedCallbacks++;
        if (completedCallbacks === numWrites) {
          try {
            // In original code: drain is only emitted when _inFlightWrites <= 0
            // So every drain event should have 0 in-flight writes at emission time
            // In mutated code: drain may be emitted with _inFlightWrites > 0
            const prematureDrains = inFlightAtDrain.filter(n => n > 0);
            expect(prematureDrains).toHaveLength(0);
          } catch (err) {
            fs.rmSync(tmpDir, { recursive: true, force: true });
            done(err);
            return;
          }
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        }
      };

      for (let i = 0; i < numWrites; i++) {
        db.set(`key${i}`, { data: largeValue, index: i }, checkDone);
      }
    });

    db.on('error', (err: Error) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 15000);
});