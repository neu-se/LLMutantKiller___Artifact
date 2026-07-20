import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding mutation', () => {
  it('should properly write UTF-8 encoded data to file', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'test';
      const testValue = { data: 'test' };

      db.set(testKey, testValue, (err: Error | null) => {
        expect(err).toBeNull();

        db.close();

        // Read the file and verify it's valid UTF-8
        fs.readFile(dbPath, (readErr, data) => {
          expect(readErr).toBeNull();

          // Try to decode as UTF-8 (will throw if invalid)
          const decoder = new TextDecoder('utf-8', { fatal: true });
          let decoded: string;
          try {
            decoded = decoder.decode(data);
          } catch (e) {
            expect(true).toBe(false); // Force failure if decoding fails
            return done();
          }

          // Verify the content
          const lines = decoded.trim().split('\n');
          expect(lines.length).toBe(1);
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