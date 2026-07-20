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

  it('should continue flushing when waitForDrain is true and queue has items', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteDone = false;
    let secondWriteDone = false;

    db.on('load', () => {
      // First write with large data to trigger waitForDrain
      db.set('key1', { value: 'x'.repeat(100000) }, (err) => {
        if (err) return done(err);
        firstWriteDone = true;

        // Immediately queue another write while first is still draining
        db.set('key2', { value: 'y' }, (err) => {
          if (err) return done(err);
          secondWriteDone = true;

          // Both writes should complete successfully
          expect(firstWriteDone).toBe(true);
          expect(secondWriteDone).toBe(true);
          expect(db.size()).toBe(2);
          db.close();
          done();
        });
      });
    });

    db.on('error', done);
  });
});