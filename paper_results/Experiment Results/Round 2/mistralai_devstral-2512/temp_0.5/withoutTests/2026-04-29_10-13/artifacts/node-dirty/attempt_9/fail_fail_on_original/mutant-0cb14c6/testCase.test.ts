import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database drain event mutation test', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should emit drain when inFlightWrites reaches exactly 0', (done) => {
    const db = new Dirty(dbPath);
    let drainCount = 0;

    db.on('drain', () => {
      drainCount++;
      if (drainCount === 1) {
        // First drain after initial writes
        expect(db.get('key1')).toBe('value1');
        expect(db.get('key2')).toBe('value2');

        // Perform a single write that will make _inFlightWrites go from 1 to 0
        db.set('key3', 'value3', () => {
          // This callback executes when the write completes
          // At this point _inFlightWrites should be 0
          // Original code will emit drain (<= 0)
          // Mutated code won't emit drain (< 0)
        });
      } else if (drainCount === 2) {
        // This should be reached in original code but not in mutated code
        expect(db.get('key3')).toBe('value3');
        db.close();
        done();
      }
    });

    // Initial writes to set up the database
    db.set('key1', 'value1');
    db.set('key2', 'value2');

    // Safety timeout
    setTimeout(() => {
      throw new Error('Test timed out - drain event was not emitted as expected');
    }, 3000);
  });
});