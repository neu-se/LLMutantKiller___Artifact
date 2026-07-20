import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event mutation test', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites is exactly 0 (not just negative)', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // First drain after initial writes
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');

        // Force a write that will cause _inFlightWrites to go from 1 to 0
        db.set('key3', 'value3', () => {
          // This should trigger drain again
        });
      } else if (drainCount === 2) {
        // This should be reached in original code but not in mutated code
        expect(db.get('key3')).toBe('value3');
        db.close();
        done();
      }
    });

    // Initial writes
    db.set('key1', 'value1');
    db.set('key2', 'value2');
  });
});