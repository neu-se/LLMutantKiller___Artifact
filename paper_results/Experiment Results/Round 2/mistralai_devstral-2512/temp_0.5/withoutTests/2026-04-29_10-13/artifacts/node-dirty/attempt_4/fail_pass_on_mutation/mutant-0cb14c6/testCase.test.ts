import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event boundary condition', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites transitions from 1 to 0', (done) => {
    const db = new Dirty(dbPath);
    let drainEmitted = false;

    db.on('drain', () => {
      if (!drainEmitted) {
        drainEmitted = true;
        // Verify the write completed
        expect(db.get('singleKey')).toBe('singleValue');
        done();
      }
    });

    // Perform a single write operation that will make _inFlightWrites go from 1 to 0
    // This specifically tests the boundary condition where the mutation changes <= to <
    db.set('singleKey', 'singleValue', () => {
      // Callback should execute before drain
      expect(db.get('singleKey')).toBe('singleValue');
    });
  });
});