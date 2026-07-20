import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should properly handle UTF-8 characters in file writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Test with multi-byte UTF-8 characters
      const testKey = 'utf8-test';
      const testValue = { text: 'こんにちは世界', emoji: '😀' };

      db.set(testKey, testValue, (err) => {
        expect(err).toBeNull();

        db.close();

        // Read the raw file content
        fs.readFile(dbPath, (readErr, rawData) => {
          expect(readErr).toBeNull();

          // The raw data should be valid UTF-8
          const data = rawData.toString('utf-8');
          const lines = data.trim().split('\n');
          expect(lines.length).toBe(1);

          const parsed = JSON.parse(lines[0]);
          expect(parsed.key).toBe(testKey);
          expect(parsed.val).toEqual(testValue);

          // Verify the raw bytes are valid UTF-8
          const decoder = new TextDecoder('utf-8', { fatal: true });
          try {
            decoder.decode(rawData);
            // Clean up
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          } catch (e) {
            // This will fail if the encoding was mutated to empty string
            expect(true).toBe(false);
            done();
          }
        });
      });
    });
  });
});