import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database parsing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should correctly process database entries without side effects from return values', (done) => {
    // Create a database file with entries that will trigger the return statement
    fs.writeFileSync(dbPath, '{"key":"test1","val":"value1"}\n{"key":"test2","val":"value2"}\n');

    const db = new Dirty(dbPath);
    let loadFired = false;
    let errorFired = false;

    db.on('load', (size) => {
      loadFired = true;
      // Verify all entries were loaded correctly
      expect(size).toBe(2);
      expect(db.get('test1')).toBe('value1');
      expect(db.get('test2')).toBe('value2');
      expect(errorFired).toBe(false);
      done();
    });

    db.on('error', (err) => {
      errorFired = true;
      // The mutation returns a non-empty string which might cause parsing issues
      done(new Error(`Unexpected error during parsing: ${err.message}`));
    });

    // Timeout to ensure test fails if neither event fires
    setTimeout(() => {
      if (!loadFired && !errorFired) {
        done(new Error('Neither load nor error event fired'));
      }
    }, 200);
  });
});