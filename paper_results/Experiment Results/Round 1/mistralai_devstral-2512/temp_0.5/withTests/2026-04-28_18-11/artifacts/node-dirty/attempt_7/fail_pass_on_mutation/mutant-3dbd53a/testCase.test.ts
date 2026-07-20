import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('encoding mutation test', () => {
  it('should correctly write multi-byte characters with utf-8 encoding', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.dirty');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use characters that require proper UTF-8 encoding
      const testKey = 'utf8Test';
      const testValue = 'Hello 世界 🌍 Café';
      db.set(testKey, testValue);

      db.on('drain', () => {
        // Read the raw file content
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        const lines = fileContent.trim().split('\n');
        const lastLine = lines[lines.length - 1];
        const parsed = JSON.parse(lastLine);

        // Verify the content is exactly as expected
        expect(parsed.key).toBe(testKey);
        expect(parsed.val).toBe(testValue);

        // Verify we can read it back
        const db2 = new Dirty(dbPath);
        db2.on('load', () => {
          expect(db2.get(testKey)).toBe(testValue);

          // Clean up
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });
  });
});