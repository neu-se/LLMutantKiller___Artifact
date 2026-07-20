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

  it('should flush queue when waitForDrain is true and queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteCompleted = false;
    let secondWriteCompleted = false;
    let drainCount = 0;

    db.on('load', () => {
      // First write with large data to trigger waitForDrain
      db.set('key1', { value: 'x'.repeat(100000) }, (err: unknown) => {
        if (err) return done(err as Error);
        firstWriteCompleted = true;
      });

      // Immediately queue another write while first is still draining
      db.set('key2', { value: 'y' }, (err: unknown) => {
        if (err) return done(err as Error);
        secondWriteCompleted = true;
      });

      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // In original code, both writes should complete before first drain
          // In mutated code, second write might not complete
          expect(firstWriteCompleted).toBe(true);
          expect(secondWriteCompleted).toBe(true);
          expect(db.size()).toBe(2);
          db.close();
          done();
        }
      });
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  }, 10000);
});