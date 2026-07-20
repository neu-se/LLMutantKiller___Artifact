import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database encoding', () => {
  it('should correctly write and read data with UTF-8 encoding', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const db = new Dirty(dbPath);

    db.on('load', () => {
      const testKey = 'testKey';
      const testValue = { message: 'Hello, 世界! 🌍', number: 42 };

      db.set(testKey, testValue, (err) => {
        expect(err).toBeNull();

        db.close();

        const readStream = fs.createReadStream(dbPath, { encoding: 'utf-8' });
        let data = '';

        readStream.on('data', (chunk) => {
          data += chunk;
        });

        readStream.on('end', () => {
          const lines = data.trim().split('\n');
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