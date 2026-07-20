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

  it('should correctly handle non-ASCII characters with UTF-8 encoding', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'testKey';
    const testValue = { message: 'Hello 世界 🌍' }; // Contains non-ASCII and emoji

    db.on('load', () => {
      db.set(testKey, testValue, (err: unknown) => {
        if (err) {
          done(err as Error);
          return;
        }

        // Wait for write to complete
        setTimeout(() => {
          try {
            // Read the raw file content
            const rawData = fs.readFileSync(dbPath);
            const data = rawData.toString('utf-8');
            const lines = data.trim().split('\n');
            const lastLine = lines[lines.length - 1];
            const parsed = JSON.parse(lastLine);

            // Verify the data is correctly encoded
            expect(parsed.key).toBe(testKey);
            expect(parsed.val).toEqual(testValue);

            // Verify the raw bytes match UTF-8 encoding
            const expectedBytes = Buffer.from(JSON.stringify({key: testKey, val: testValue}) + '\n', 'utf-8');
            expect(rawData.slice(rawData.lastIndexOf(expectedBytes[0]))).toEqual(expectedBytes);

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