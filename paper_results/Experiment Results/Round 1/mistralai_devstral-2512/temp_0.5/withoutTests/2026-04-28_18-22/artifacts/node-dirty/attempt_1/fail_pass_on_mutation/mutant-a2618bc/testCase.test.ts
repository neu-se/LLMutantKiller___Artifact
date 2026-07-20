import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database write behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should handle multiple concurrent writes correctly', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    const totalWrites = 100;

    db.on('load', () => {
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: i }, (err) => {
          if (err) {
            done(err);
            return;
          }
          writeCount++;
          if (writeCount === totalWrites) {
            setTimeout(() => {
              db.close();
              const content = fs.readFileSync(dbPath, 'utf-8');
              const lines = content.trim().split('\n');
              expect(lines.length).toBe(totalWrites);
              done();
            }, 100);
          }
        });
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});