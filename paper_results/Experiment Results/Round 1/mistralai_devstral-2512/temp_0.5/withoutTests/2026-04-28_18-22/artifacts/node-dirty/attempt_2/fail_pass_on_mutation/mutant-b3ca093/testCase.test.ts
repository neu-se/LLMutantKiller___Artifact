import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should properly handle queue processing when waitForDrain is true', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteCompleted = false;
    let secondWriteCompleted = false;

    db.on('load', () => {
      // First write that will trigger drain
      db.set('key1', { value: 'large'.repeat(10000) }, (err) => {
        if (err) {
          done(err);
          return;
        }
        firstWriteCompleted = true;

        // Second write that should be processed after drain
        db.set('key2', { value: 'small' }, (err) => {
          if (err) {
            done(err);
            return;
          }
          secondWriteCompleted = true;

          // Both writes should complete
          expect(firstWriteCompleted).toBe(true);
          expect(secondWriteCompleted).toBe(true);
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