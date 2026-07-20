import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database drain event', () => {
  it('should emit drain event when all writes are complete and queue is empty', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      db.set('key1', 'value1', () => {
        // Queue should be empty after this write completes
        // The mutation would incorrectly trigger _flush() even when queue is empty
        // causing potential issues with the drain event timing
        db.on('drain', () => {
          // Verify the drain event was emitted correctly
          expect(db.size()).toBe(1);
          db.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
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