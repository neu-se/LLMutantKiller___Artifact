import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event with exact write count', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites reaches exactly 0', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('drain', () => {
      if (!drainEmitted) {
        drainEmitted = true;
        // Verify all writes completed
        expect(db.get('testKey')).toBe('testValue');
        expect(db.size()).toBe(1);
        done();
      }
    });

    // Force a single write that will make _inFlightWrites go from 1 to 0
    db.set('testKey', 'testValue', () => {
      // This callback should fire before drain
      expect(db.get('testKey')).toBe('testValue');
    });
  });
});