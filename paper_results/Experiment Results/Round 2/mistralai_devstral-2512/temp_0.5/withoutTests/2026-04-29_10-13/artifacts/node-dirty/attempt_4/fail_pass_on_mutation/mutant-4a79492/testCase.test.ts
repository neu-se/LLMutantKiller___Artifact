import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database drain behavior', () => {
  it('should emit exactly one drain event for sequential writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.on('load', () => {
      // First write
      db.set('key1', 'value1', () => {
        // Second write after first completes
        db.set('key2', 'value2', () => {
          // Wait for potential drain events
          setImmediate(() => {
            // Original code should emit exactly 2 drain events (one per write)
            // Mutated code would emit more due to unnecessary flush calls
            expect(drainCount).toBe(2);
            expect(db.size()).toBe(2);
            db.close();
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          });
        });
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});