import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty encoding mutation test', () => {
  it('should fail when encoding is not set to utf-8 for multi-byte characters', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');

    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Write data with multi-byte UTF-8 characters
      const testKey = 'testKey';
      const testValue = { data: '日本語' };

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

          // Verify the raw file content contains the correct encoding
          const rawContent = fs.readFileSync(dbPath, 'utf-8');
          expect(rawContent).toContain('日本語');

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