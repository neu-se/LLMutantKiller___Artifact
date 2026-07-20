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

  it('should emit drain event when all writes are complete', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // First drain should occur after the initial writes complete
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');
        expect(db.get('key3')).toBe('value3');

        // Add one more write to test the boundary condition
        db.set('key4', 'value4', () => {
          // This callback should be called, and drain should emit again
        });
      } else if (drainCount === 2) {
        // Second drain should occur after the additional write
        expect(db.get('key4')).toBe('value4');
        db.close();
        done();
      }
    });

    // Write multiple values to ensure _inFlightWrites reaches exactly 0
    db.set('key1', 'value1');
    db.set('key2', 'value2');
    db.set('key3', 'value3');
  });
});