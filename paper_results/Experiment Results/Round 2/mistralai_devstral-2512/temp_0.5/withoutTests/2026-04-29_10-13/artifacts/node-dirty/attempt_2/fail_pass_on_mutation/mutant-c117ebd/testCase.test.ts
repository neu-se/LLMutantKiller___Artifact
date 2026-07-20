import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty encoding mutation test', () => {
  it('should fail when encoding is not properly set to utf-8', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');

    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Write data with special characters that would fail with incorrect encoding
      const testKey = 'testKey';
      const testValue = { data: 'café' }; // Contains accented character

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