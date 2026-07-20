import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database write stream behavior', () => {
  it('should correctly handle drain events without unnecessary flushes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let drainEvents = 0;
    let writeOperations = 0;
    const expectedWrites = 2;

    db.on('drain', () => {
      drainEvents++;
    });

    db.on('load', () => {
      // Perform two sequential writes
      const write1 = () => {
        db.set('key1', 'value1', () => {
          writeOperations++;
          if (writeOperations === expectedWrites) {
            checkResults();
          } else {
            write2();
          }
        });
      };

      const write2 = () => {
        db.set('key2', 'value2', () => {
          writeOperations++;
          if (writeOperations === expectedWrites) {
            checkResults();
          }
        });
      };

      const checkResults = () => {
        setImmediate(() => {
          // Original code should emit exactly 2 drain events (one per write batch)
          // Mutated code would emit more due to unnecessary flush calls
          expect(drainEvents).toBe(2);
          expect(db.size()).toBe(2);
          db.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      };

      write1();
    });

    db.on('error', (err) => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  }, 10000);
});