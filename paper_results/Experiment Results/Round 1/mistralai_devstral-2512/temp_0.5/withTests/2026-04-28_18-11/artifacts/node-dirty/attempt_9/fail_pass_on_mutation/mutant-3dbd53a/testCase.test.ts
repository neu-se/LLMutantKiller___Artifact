import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('encoding mutation test', () => {
  it('should correctly handle UTF-8 encoding in write stream', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.dirty');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use a string with multi-byte UTF-8 characters
      const testKey = 'utf8Test';
      const testValue = 'Hello 世界 🌍 Café résumé';
      db.set(testKey, testValue);

      db.on('drain', () => {
        // Read the file as binary to verify exact encoding
        const fileContent = fs.readFileSync(dbPath);
        const expectedContent = `${JSON.stringify({key: testKey, val: testValue})}\n`;

        // This will fail on mutated code because empty encoding changes the bytes written
        expect(fileContent.toString('utf-8')).toBe(expectedContent);

        // Verify we can read it back correctly
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