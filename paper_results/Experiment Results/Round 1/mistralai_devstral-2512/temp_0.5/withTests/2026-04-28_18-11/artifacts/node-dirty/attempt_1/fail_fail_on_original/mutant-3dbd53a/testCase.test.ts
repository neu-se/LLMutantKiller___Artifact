import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('encoding mutation test', () => {
  it('should correctly write and read data with utf-8 encoding', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.dirty');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Test with a string that would fail with incorrect encoding
      const testKey = 'testKey';
      const testValue = 'Hello, 世界! 🌍';
      db.set(testKey, testValue, (err) => {
        if (err) {
          done(err);
          return;
        }

        db.on('drain', () => {
          // Read the file directly to verify encoding
          const fileContent = fs.readFileSync(dbPath, 'utf-8');
          const lines = fileContent.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          const parsed = JSON.parse(lastLine);

          expect(parsed.key).toBe(testKey);
          expect(parsed.val).toBe(testValue);

          // Verify we can read it back through Dirty
          const db2 = new Dirty(dbPath);
          db2.on('load', () => {
            expect(db2.get(testKey)).toBe(testValue);
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          });
        });
      });
    });
  });
});