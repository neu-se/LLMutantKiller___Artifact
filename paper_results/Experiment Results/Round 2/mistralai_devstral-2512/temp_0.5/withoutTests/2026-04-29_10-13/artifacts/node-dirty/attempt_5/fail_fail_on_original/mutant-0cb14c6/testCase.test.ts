import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database drain event mutation detection', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit drain when inFlightWrites is exactly 0', (done) => {
    const db = new Dirty(dbPath);
    let writeCallbackCalled = false;
    let drainEmitted = false;

    db.on('drain', () => {
      drainEmitted = true;
      // In original code, this should be called when _inFlightWrites reaches 0
      // In mutated code (< instead of <=), this won't be called when going from 1 to 0
      expect(writeCallbackCalled).toBe(true);
      done();
    });

    // Perform a single write that will make _inFlightWrites go from 1 to 0
    db.set('testKey', 'testValue', () => {
      writeCallbackCalled = true;
      // This callback executes when the write completes
      // At this point _inFlightWrites should be 0
      expect(db.get('testKey')).toBe('testValue');
    });
  });
});