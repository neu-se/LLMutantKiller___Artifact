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

  it('should not prematurely return from _flush when waitForDrain is true and queue has items', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteCompleted = false;
    let secondWriteCompleted = false;

    db.on('load', () => {
      // First write that will fill buffer and set waitForDrain to true
      db.set('key1', { value: 'x'.repeat(10000) }, (err: Error | null) => {
        firstWriteCompleted = true;
        if (err) {
          done(err);
          return;
        }

        // Immediately queue another write while waitForDrain is true
        // This should still be processed in original code but not in mutated code
        db.set('key2', { value: 'y' }, (err: Error | null) => {
          secondWriteCompleted = true;
          if (err) {
            done(err);
            return;
          }

          // In original code, both writes should complete
          // In mutated code, second write won't complete because _flush returns early
          expect(firstWriteCompleted).toBe(true);
          expect(secondWriteCompleted).toBe(true);
          db.close();
          done();
        });
      });
    });

    db.on('error', (err: Error) => {
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      if (!firstWriteCompleted || !secondWriteCompleted) {
        done(new Error('Timeout: Not all writes completed'));
      }
    }, 5000);
  });
});