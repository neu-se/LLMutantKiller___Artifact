import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding', () => {
  const testDir = path.join(__dirname, 'test-dirty-encoding');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should correctly write and read UTF-8 encoded data', (done) => {
    const db = new Dirty(dbPath);
    const testKey = 'testKey';
    const testValue = { message: 'Hello 世界' }; // Contains non-ASCII characters

    db.on('load', () => {
      db.set(testKey, testValue, (err) => {
        if (err) {
          done(err);
          return;
        }

        db.on('drain', () => {
          // Read the file directly to verify encoding
          const data = fs.readFileSync(dbPath, 'utf-8');
          const lines = data.trim().split('\n');
          const lastLine = lines[lines.length - 1];
          const parsed = JSON.parse(lastLine);

          expect(parsed.key).toBe(testKey);
          expect(parsed.val).toEqual(testValue);

          // Verify we can read it back through Dirty
          const db2 = new Dirty(dbPath);
          db2.on('load', () => {
            expect(db2.get(testKey)).toEqual(testValue);
            db2.close();
            db.close();
            done();
          });
        });
      });
    });
  });
});