import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database parsing behavior', () => {
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

  it('should not be affected by non-empty return values during parsing', (done) => {
    // Create a database file with multiple entries
    fs.writeFileSync(dbPath, '{"key":"a","val":1}\n{"key":"b","val":2}\n{"key":"c","val":3}\n');

    const db = new Dirty(dbPath);
    let loadCount = 0;

    db.on('load', (size) => {
      loadCount++;
      // The original code returns '' which doesn't affect behavior
      // The mutated code returns a non-empty string which might cause issues
      expect(size).toBe(3);
      expect(db.get('a')).toBe(1);
      expect(db.get('b')).toBe(2);
      expect(db.get('c')).toBe(3);

      // Verify load event only fires once
      expect(loadCount).toBe(1);
      done();
    });

    db.on('error', (err) => {
      // If mutation causes parsing issues, this will catch it
      done(new Error(`Parsing error: ${err.message}`));
    });

    // Timeout to ensure test fails if load doesn't fire
    setTimeout(() => {
      if (loadCount === 0) {
        done(new Error('Load event never fired'));
      }
    }, 200);
  });
});