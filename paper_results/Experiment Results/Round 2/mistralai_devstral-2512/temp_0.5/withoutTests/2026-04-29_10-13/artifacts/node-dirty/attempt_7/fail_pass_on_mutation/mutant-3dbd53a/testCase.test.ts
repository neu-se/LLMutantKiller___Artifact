import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should detect invalid encoding when writing multi-byte characters', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use characters that require proper UTF-8 encoding
      const testKey = '日本語';
      const testValue = { text: 'テストデータ', emoji: '🎌' };

      db.set(testKey, testValue, (err: Error | null) => {
        expect(err).toBeNull();

        db.close();

        // Read the raw file content
        fs.readFile(dbPath, (readErr, rawData) => {
          expect(readErr).toBeNull();

          // Verify the raw data contains valid UTF-8 sequences
          const buffer = Buffer.from(rawData);
          let isValidUTF8 = true;

          // Check for valid UTF-8 byte sequences
          for (let i = 0; i < buffer.length; i++) {
            const byte = buffer[i];
            if (byte >= 0xF0) { // 4-byte sequence
              if (i + 3 >= buffer.length ||
                 (buffer[i+1] & 0xC0) !== 0x80 ||
                 (buffer[i+2] & 0xC0) !== 0x80 ||
                 (buffer[i+3] & 0xC0) !== 0x80) {
                isValidUTF8 = false;
                break;
              }
              i += 3;
            } else if (byte >= 0xE0) { // 3-byte sequence
              if (i + 2 >= buffer.length ||
                 (buffer[i+1] & 0xC0) !== 0x80 ||
                 (buffer[i+2] & 0xC0) !== 0x80) {
                isValidUTF8 = false;
                break;
              }
              i += 2;
            } else if (byte >= 0xC0) { // 2-byte sequence
              if (i + 1 >= buffer.length ||
                 (buffer[i+1] & 0xC0) !== 0x80) {
                isValidUTF8 = false;
                break;
              }
              i += 1;
            }
          }

          expect(isValidUTF8).toBe(true);

          // Also verify we can decode and parse it
          const decoder = new TextDecoder('utf-8');
          const decoded = decoder.decode(rawData);
          const lines = decoded.trim().split('\n');
          expect(lines.length).toBeGreaterThan(0);

          const parsed = JSON.parse(lines[0]);
          expect(parsed.key).toBe(testKey);
          expect(parsed.val).toEqual(testValue);

          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });
  });
});