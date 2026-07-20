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

  it('should correctly handle UTF-8 encoding for emoji characters', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'emojiTest';
    const testValue = { emoji: '😀🎉🌈' }; // Contains only emoji characters

    db.on('load', () => {
      db.set(testKey, testValue, (err: unknown) => {
        if (err) {
          done(err as Error);
          return;
        }

        setTimeout(() => {
          try {
            // Read the raw file content
            const rawData = fs.readFileSync(dbPath);

            // Try to decode as UTF-8
            const utf8Decoded = rawData.toString('utf-8');
            const lines = utf8Decoded.trim().split('\n');
            const lastLine = lines[lines.length - 1];
            const parsed = JSON.parse(lastLine);

            // Verify the emoji data is correctly stored
            expect(parsed.key).toBe(testKey);
            expect(parsed.val).toEqual(testValue);

            // Verify the raw bytes contain valid UTF-8 sequences for emoji
            const expectedString = JSON.stringify({key: testKey, val: testValue}) + '\n';
            const expectedBytes = Buffer.from(expectedString, 'utf-8');
            const actualBytes = Buffer.from(lastLine + '\n', 'utf-8');

            // Check byte length - emoji take 4 bytes each in UTF-8
            expect(actualBytes.length).toBeGreaterThan(10); // Should be more than 10 bytes for 3 emoji

            // Verify the bytes match exactly
            expect(actualBytes.equals(expectedBytes)).toBe(true);

            db.close();
            done();
          } catch (e) {
            done(e as Error);
          }
        }, 100);
      });
    });
  }, 10000);
});