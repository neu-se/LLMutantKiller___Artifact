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

  it('should continue processing queue when waitForDrain is true and queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteCompleted = false;
    let secondWriteCompleted = false;
    let drainCount = 0;

    db.on('load', () => {
      // First write with large data to trigger waitForDrain
      db.set('key1', { value: 'x'.repeat(100000) }, (err) => {
        if (err) return done(err);
        firstWriteCompleted = true;
      });

      // Queue another write immediately
      db.set('key2', { value: 'y' }, (err) => {
        if (err) return done(err);
        secondWriteCompleted = true;
      });

      db.on('drain', () => {
        drainCount++;
        if (drainCount === 1) {
          // After first drain, both writes should be complete
          expect(firstWriteCompleted).toBe(true);
          expect(secondWriteCompleted).toBe(true);
          expect(db.size()).toBe(2);
          db.close();
          done();
        }
      });
    });

    db.on('error', done);
  });
});