import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should flush queue when waitForDrain is true but queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteCompleted = false;
    let secondWriteCompleted = false;

    db.on('load', () => {
      // First write to trigger waitForDrain
      db.set('key1', { value: 1 }, (err) => {
        if (err) {
          done(err);
          return;
        }
        firstWriteCompleted = true;

        // Second write should still be processed even if waitForDrain is true
        db.set('key2', { value: 2 }, (err) => {
          if (err) {
            done(err);
            return;
          }
          secondWriteCompleted = true;

          // Verify both writes completed
          expect(firstWriteCompleted).toBe(true);
          expect(secondWriteCompleted).toBe(true);
          expect(db.size()).toBe(2);
          db.close();
          done();
        });
      });
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});