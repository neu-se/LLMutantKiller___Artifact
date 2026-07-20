import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior with large writes', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should write all entries when buffer fills and requires multiple flushes', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;

    db.on('load', () => {
      // Create large values to force buffer filling
      const largeValue = 'x'.repeat(10000);
      const entries = 10;
      const keys = [];

      // Queue many large writes
      for (let i = 0; i < entries; i++) {
        const key = `key${i}`;
        keys.push(key);
        db.set(key, largeValue);
      }

      // Check after a delay to ensure flush completes
      setTimeout(() => {
        try {
          const data = fs.readFileSync(dbPath, 'utf-8');
          const lines = data.trim().split('\n');
          expect(lines.length).toBe(entries);

          const keysFound = lines.map(line => JSON.parse(line).key);
          keys.forEach(key => {
            expect(keysFound).toContain(key);
          });

          db.close();
          done();
        } catch (err) {
          done(err);
        }
      }, 100);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});