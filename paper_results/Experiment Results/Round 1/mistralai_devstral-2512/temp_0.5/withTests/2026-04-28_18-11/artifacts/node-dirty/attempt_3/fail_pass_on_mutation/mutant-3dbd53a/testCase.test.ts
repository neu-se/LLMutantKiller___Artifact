import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('encoding mutation test', () => {
  it('should fail when encoding is not utf-8', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.dirty');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use a string with non-ASCII characters that would be corrupted with wrong encoding
      const testKey = 'testKey';
      const testValue = 'Hello, 世界! 🌍';
      db.set(testKey, testValue);

      db.on('drain', () => {
        // Read the raw file content as binary to check encoding
        const fileContent = fs.readFileSync(dbPath);
        const expectedContent = `${JSON.stringify({key: testKey, val: testValue})}\n`;

        // The mutated code with empty encoding should produce different bytes
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