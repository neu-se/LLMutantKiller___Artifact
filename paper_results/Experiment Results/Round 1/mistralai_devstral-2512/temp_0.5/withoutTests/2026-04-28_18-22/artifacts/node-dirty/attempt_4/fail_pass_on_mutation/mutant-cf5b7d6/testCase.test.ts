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

  it('should correctly process database entries without returning non-empty strings', (done) => {
    // Create a database file with multiple entries
    const data = '{"key":"a","val":1}\n{"key":"b","val":2}\n{"key":"c","val":3}\n';
    fs.writeFileSync(dbPath, data);

    const db = new Dirty(dbPath);
    let loadCalled = false;

    db.on('load', (size) => {
      loadCalled = true;
      // Verify all entries were loaded correctly
      expect(size).toBe(3);
      expect(db.get('a')).toBe(1);
      expect(db.get('b')).toBe(2);
      expect(db.get('c')).toBe(3);
      done();
    });

    db.on('error', (err) => {
      // The mutation returns a string which might interfere with the parsing
      // This should not happen in the original code
      done(new Error(`Unexpected error during parsing: ${err.message}`));
    });

    // Give it time to process
    setTimeout(() => {
      if (!loadCalled) {
        done(new Error('Load event was never called'));
      }
    }, 100);
  });
});