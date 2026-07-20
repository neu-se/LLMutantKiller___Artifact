import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty encoding mutation test', () => {
  it('should correctly handle UTF-8 encoded data in the database file', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');

    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Write some data with UTF-8 characters
      const testKey = 'testKey';
      const testValue = { data: 'Hello 世界' }; // Contains non-ASCII characters

      db.set(testKey, testValue, (err) => {
        if (err) {
          done(err);
          return;
        }

        // Close and reopen to verify persistence
        db.close();
        const db2 = new Dirty(dbPath);
        db2.on('load', () => {
          const retrievedValue = db2.get(testKey);
          expect(retrievedValue).toEqual(testValue);

          // Clean up
          db2.close();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });
  });
});