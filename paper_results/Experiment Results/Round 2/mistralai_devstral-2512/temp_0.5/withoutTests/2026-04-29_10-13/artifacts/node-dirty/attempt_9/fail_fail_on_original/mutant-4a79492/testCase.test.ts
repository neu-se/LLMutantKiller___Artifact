import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database drain event timing', () => {
  it('should emit drain event only when queue is actually empty', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    let drainCount = 0;
    let writeComplete = false;

    db.on('drain', () => {
      drainCount++;
      if (writeComplete) {
        // This drain event should only occur once after the write completes
        expect(drainCount).toBe(1);
        expect(db.size()).toBe(1);
        db.close();
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      }
    });

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        writeComplete = true;
      });
    });

    db.on('error', (err) => {
      db.close();
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  }, 10000);
});