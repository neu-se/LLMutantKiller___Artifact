import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain event when all writes complete', (done) => {
    const db = new Dirty(dbPath);
    let loadCount = 0;
    let drainCount = 0;

    db.on('load', () => {
      loadCount++;
      if (loadCount === 1) {
        // Write multiple entries to ensure we have in-flight writes
        db.set('key1', { value: 'data1' }, () => {
          // This callback should be triggered
        });
        db.set('key2', { value: 'data2' }, () => {
          // This callback should be triggered
        });
      }
    });

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // Verify that drain was emitted with correct behavior
        expect(db.get('key1')).toEqual({ value: 'data1' });
        expect(db.get('key2')).toEqual({ value: 'data2' });
        db.close();
        done();
      }
    });

    // The mutation changes the event name from 'drain' to empty string
    // This test will fail on mutated code because it listens for 'drain'
    // but the mutated code emits '' instead
  });
});