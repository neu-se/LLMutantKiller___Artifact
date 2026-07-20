import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database write behavior', () => {
  it('should emit exactly one drain event for a single write operation', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let drainCount = 0;
    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        setImmediate(() => {
          expect(db.size()).toBe(1);
          expect(db.get('key1')).toBe('value1');
          db.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      }
    });

    db.on('load', () => {
      db.set('key1', 'value1');
    });

    db.on('error', (err) => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  }, 10000);
});