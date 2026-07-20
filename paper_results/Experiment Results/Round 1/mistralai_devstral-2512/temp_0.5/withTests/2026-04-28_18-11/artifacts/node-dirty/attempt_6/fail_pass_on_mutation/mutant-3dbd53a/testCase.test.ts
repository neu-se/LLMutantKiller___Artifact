import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('encoding mutation test', () => {
  it('should fail when write stream uses empty encoding', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.dirty');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use a string with multi-byte characters that will be corrupted with wrong encoding
      const testKey = 'encodingTest';
      const testValue = 'Café résumé 🎉';
      db.set(testKey, testValue);

      db.on('drain', () => {
        // Read the file as binary to check exact bytes
        const fileContent = fs.readFileSync(dbPath);
        const expectedContent = `${JSON.stringify({key: testKey, val: testValue})}\n`;

        // With empty encoding, the bytes written will be different
        // This assertion will fail on mutated code because the encoding is wrong
        expect(fileContent.toString('utf-8')).toBe(expectedContent);

        // Verify we can read it back correctly (this will fail on mutated code)
        const db2 = new Dirty(dbPath);
        db2.on('load', () => {
          const retrievedValue = db2.get(testKey);
          expect(retrievedValue).toBe(testValue);

          // Clean up
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });
  });
});