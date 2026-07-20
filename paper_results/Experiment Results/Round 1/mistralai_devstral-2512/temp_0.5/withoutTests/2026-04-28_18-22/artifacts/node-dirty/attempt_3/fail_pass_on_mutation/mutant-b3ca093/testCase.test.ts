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

  it('should process queue when waitForDrain is true but queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstCallbackCalled = false;
    let secondCallbackCalled = false;

    db.on('load', () => {
      // First write that will fill the buffer and set waitForDrain
      db.set('key1', { value: 'x'.repeat(10000) }, (err) => {
        firstCallbackCalled = true;
        if (err) {
          done(err);
          return;
        }

        // Immediately queue another write while waitForDrain is true
        db.set('key2', { value: 'y' }, (err) => {
          secondCallbackCalled = true;
          if (err) {
            done(err);
            return;
          }

          // In original code, both callbacks should be called
          // In mutated code, the second callback won't be called
          expect(firstCallbackCalled).toBe(true);
          expect(secondCallbackCalled).toBe(true);
          db.close();
          done();
        });
      });
    });

    db.on('error', (err) => {
      done(err);
    });

    // Timeout to prevent hanging
    setTimeout(() => {
      if (!firstCallbackCalled || !secondCallbackCalled) {
        done(new Error('Timeout: Not all callbacks were called'));
      }
    }, 5000);
  });
});