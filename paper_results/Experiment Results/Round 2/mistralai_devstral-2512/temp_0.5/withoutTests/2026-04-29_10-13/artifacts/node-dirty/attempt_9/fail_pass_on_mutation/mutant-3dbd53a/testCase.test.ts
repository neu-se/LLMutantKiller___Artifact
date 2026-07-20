import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should properly handle UTF-8 encoding in write stream', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'test';
      const testValue = { data: 'test' };

      db.set(testKey, testValue, (err: Error | null) => {
        expect(err).toBeNull();

        // Force flush to ensure data is written
        const writeStream = (db as any)._writeStream;
        writeStream.uncork();

        db.close();

        // Read the file and verify encoding
        fs.readFile(dbPath, (readErr, data) => {
          expect(readErr).toBeNull();

          // Check if the file contains valid UTF-8 BOM or proper encoding
          const hasBOM = data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF;
          const isValidUTF8 = hasBOM || !data.includes(0x00); // Check for null bytes

          expect(isValidUTF8).toBe(true);

          // Verify content
          const content = data.toString('utf-8');
          const lines = content.trim().split('\n');
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