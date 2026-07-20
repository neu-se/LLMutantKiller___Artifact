import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should fail when write stream encoding is empty string', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'test';
      const testValue = { data: 'test' };

      db.set(testKey, testValue, (err: Error | null) => {
        expect(err).toBeNull();

        // Force a flush to ensure data is written
        const writeStream = (db as any)._writeStream;
        writeStream.uncork();

        db.close();

        // Read the raw file content
        fs.readFile(dbPath, (readErr, rawData) => {
          expect(readErr).toBeNull();

          // Check if the file contains valid UTF-8 by trying to decode it
          const decoder = new TextDecoder('utf-8', { fatal: true });
          try {
            const decoded = decoder.decode(rawData);
            const lines = decoded.trim().split('\n');
            expect(lines.length).toBeGreaterThan(0);

            // Verify we can parse the JSON
            const parsed = JSON.parse(lines[0]);
            expect(parsed.key).toBe(testKey);
            expect(parsed.val).toEqual(testValue);
          } catch (e) {
            // This should fail on mutated code
            expect(true).toBe(false);
          } finally {
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          }
        });
      });
    });
  });
});