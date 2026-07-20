import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;
    let drainCount = 0;

    db.on('load', () => {
      loadCount++;
      // Set multiple keys to ensure we have writes in flight
      db.set('key1', { value: 1 }, () => {});
      db.set('key2', { value: 2 }, () => {});
      db.set('key3', { value: 3 }, () => {});
    });

    db.on('drain', () => {
      drainCount++;
      // After the first drain (from initial writes), close the db
      // This should trigger another drain when close completes
      if (drainCount === 1) {
        db.close();
      } else if (drainCount === 2) {
        // This should be reached in original code but not in mutated code
        expect(loadCount).toBe(1);
        expect(drainCount).toBe(2);
        done();
      }
    });

    // Timeout to prevent test hanging
    setTimeout(() => {
      done(new Error('Test timed out - drain event not emitted as expected'));
    }, 2000);
  });
});