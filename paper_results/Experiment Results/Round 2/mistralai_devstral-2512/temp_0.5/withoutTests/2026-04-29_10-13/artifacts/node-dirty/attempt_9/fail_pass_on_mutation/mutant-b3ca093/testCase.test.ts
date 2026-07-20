import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  it('should process all queue items when waitForDrain is true', (done) => {
    const db = new Dirty(dbPath);
    let writeCount = 0;
    const totalWrites = 3;

    db.on('load', () => {
      // Queue multiple writes
      for (let i = 0; i < totalWrites; i++) {
        db.set(`key${i}`, { value: 'x'.repeat(10000) }, (err: unknown) => {
          if (err) return done(err as Error);
          writeCount++;

          // Check if all writes completed
          if (writeCount === totalWrites) {
            expect(db.size()).toBe(totalWrites);
            db.close();
            done();
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  }, 10000);
});