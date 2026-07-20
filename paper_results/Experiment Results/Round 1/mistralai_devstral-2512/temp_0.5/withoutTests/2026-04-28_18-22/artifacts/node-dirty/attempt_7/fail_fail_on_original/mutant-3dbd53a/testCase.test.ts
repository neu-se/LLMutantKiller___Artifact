import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-dirty-encoding');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should fail when encoding is not UTF-8', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'testKey';
    const testValue = { message: 'Hello 世界' }; // Contains non-ASCII characters

    db.on('load', () => {
      db.set(testKey, testValue, (err: unknown) => {
        if (err) {
          done(err as Error);
          return;
        }

        // Wait for write to complete
        setTimeout(() => {
          try {
            // Read the file as binary to check encoding
            const rawData = fs.readFileSync(dbPath);

            // Try to decode as UTF-8 - should work with original code
            const utf8Decoded = rawData.toString('utf-8');
            const lines = utf8Decoded.trim().split('\n');
            const lastLine = lines[lines.length - 1];
            const parsed = JSON.parse(lastLine);

            // Verify the data is correctly encoded
            expect(parsed.key).toBe(testKey);
            expect(parsed.val).toEqual(testValue);

            // Now try to decode as ASCII - should fail with non-ASCII characters
            try {
              const asciiDecoded = rawData.toString('ascii');
              // If we get here, the encoding was not UTF-8 (mutated case)
              done(new Error('File was not encoded as UTF-8 - ASCII decoding succeeded'));
            } catch (e) {
              // Expected behavior - ASCII decoding should fail with non-ASCII characters
              db.close();
              done();
            }
          } catch (e) {
            done(e as Error);
          }
        }, 100);
      });
    });
  }, 10000);
});