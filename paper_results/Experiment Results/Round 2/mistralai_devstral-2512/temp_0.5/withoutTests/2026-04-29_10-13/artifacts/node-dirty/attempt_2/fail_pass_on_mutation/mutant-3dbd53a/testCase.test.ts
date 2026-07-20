import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should fail when encoding is empty string', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'testKey';
      const testValue = { message: 'Hello, 世界! 🌍', number: 42 };

      db.set(testKey, testValue, (err) => {
        expect(err).toBeNull();

        db.close();

        // Try to read the file with UTF-8 encoding
        fs.readFile(dbPath, 'utf-8', (readErr, data) => {
          expect(readErr).toBeNull();

          // The data should be properly encoded in UTF-8
          const lines = data.trim().split('\n');
          expect(lines.length).toBe(1);

          const parsed = JSON.parse(lines[0]);
          expect(parsed.key).toBe(testKey);
          expect(parsed.val).toEqual(testValue);

          // Clean up
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });

    db.on('error', (err) => {
      // This should not be called in the original code
      expect(true).toBe(false); // Force test failure if error occurs
      done();
    });
  });
});