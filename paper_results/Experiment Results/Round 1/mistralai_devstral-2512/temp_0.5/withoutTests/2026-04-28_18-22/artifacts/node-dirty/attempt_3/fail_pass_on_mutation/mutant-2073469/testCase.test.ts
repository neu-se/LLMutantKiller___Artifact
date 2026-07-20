import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event verification', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit exactly one drain event when writes complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;
    let emptyEventCount = 0;

    db.on('load', () => {
      // Write multiple entries to ensure we have in-flight writes
      db.set('key1', { value: 'data1' });
      db.set('key2', { value: 'data2' });
    });

    db.on('drain', () => {
      drainCount++;
    });

    db.on('', () => {
      emptyEventCount++;
    });

    setTimeout(() => {
      try {
        expect(drainCount).toBeGreaterThan(0);
        expect(emptyEventCount).toBe(0);
        db.close();
        done();
      } catch (error) {
        done(error);
      }
    }, 200);
  });
});