import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database write behavior', () => {
  it('should correctly handle multiple writes and drain events', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
    });

    db.on('load', () => {
      // Perform multiple writes
      db.set('key1', 'value1', () => {
        db.set('key2', 'value2', () => {
          // After both writes complete, we should get exactly one drain event
          setImmediate(() => {
            expect(drainCount).toBe(1);
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