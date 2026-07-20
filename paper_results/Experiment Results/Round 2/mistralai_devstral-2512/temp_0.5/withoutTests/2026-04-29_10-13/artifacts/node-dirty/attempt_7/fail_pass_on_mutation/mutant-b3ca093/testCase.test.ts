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

  it('should process queue when waitForDrain is true and queue is not empty', (done) => {
    const db = new Dirty(dbPath);
    let firstCallbackCalled = false;
    let secondCallbackCalled = false;

    db.on('load', () => {
      // First write with large data to trigger waitForDrain
      db.set('key1', { value: 'x'.repeat(100000) }, (err: unknown) => {
        if (err) return done(err as Error);
        firstCallbackCalled = true;
      });

      // Queue another write immediately
      db.set('key2', { value: 'y' }, (err: unknown) => {
        if (err) return done(err as Error);
        secondCallbackCalled = true;
      });

      // Check after a short delay to allow processing
      setTimeout(() => {
        expect(firstCallbackCalled).toBe(true);
        expect(secondCallbackCalled).toBe(true);
        expect(db.size()).toBe(2);
        db.close();
        done();
      }, 100);
    });

    db.on('error', (err: Error) => {
      done(err);
    });
  });
});