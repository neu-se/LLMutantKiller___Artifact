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

  it('should process queue when waitForDrain is true and queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstWriteDone = false;
    let secondWriteDone = false;

    db.on('load', () => {
      // First write that will trigger drain
      db.set('key1', { value: 'x'.repeat(10000) }, (err) => {
        firstWriteDone = true;
        if (err) {
          done(err);
          return;
        }

        // Queue another write while the first is still draining
        db.set('key2', { value: 'y' }, (err) => {
          secondWriteDone = true;
          if (err) {
            done(err);
            return;
          }

          // Both writes should complete
          expect(firstWriteDone).toBe(true);
          expect(secondWriteDone).toBe(true);
          db.close();
          done();
        });
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 2000);
  });
});