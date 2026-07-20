import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with multiple writes', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when in-flight writes reach zero', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('load', () => {
      db.on('drain', () => {
        drainEmitted = true;
      });

      // Perform multiple writes to ensure we have in-flight writes
      db.set('key1', { value: 'test1' }, () => {});
      db.set('key2', { value: 'test2' }, () => {});
      db.set('key3', { value: 'test3' }, () => {});

      // Wait for all writes to complete
      setTimeout(() => {
        expect(drainEmitted).toBe(true);
        expect(db.size()).toBe(3);
        done();
      }, 100);
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});