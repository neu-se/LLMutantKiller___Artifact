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

  it('should process queue when waitForDrain is true and queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstCallbackCalled = false;
    let secondCallbackCalled = false;

    db.on('load', () => {
      // First write that will trigger waitForDrain
      db.set('key1', { value: 'large'.repeat(10000) }, () => {
        firstCallbackCalled = true;
      });

      // Second write that should be processed despite waitForDrain
      setImmediate(() => {
        db.set('key2', { value: 'test' }, () => {
          secondCallbackCalled = true;
          expect(firstCallbackCalled).toBe(true);
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