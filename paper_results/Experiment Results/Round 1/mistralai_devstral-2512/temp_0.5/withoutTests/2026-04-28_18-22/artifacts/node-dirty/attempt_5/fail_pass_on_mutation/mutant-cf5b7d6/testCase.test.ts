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

  it('should not return non-empty strings during parsing that could affect behavior', (done) => {
    // Create a database with entries that will trigger the return statement in the forEach
    fs.writeFileSync(dbPath, '{"key":"test1","val":"value1"}\n{"key":"test2","val":"value2"}\n');

    const db = new Dirty(dbPath);
    let parsingComplete = false;

    db.on('load', (size) => {
      parsingComplete = true;
      // In original code, the return '' doesn't affect anything
      // In mutated code, return "Stryker was here!" might cause issues
      expect(size).toBe(2);
      expect(db.get('test1')).toBe('value1');
      expect(db.get('test2')).toBe('value2');
      done();
    });

    db.on('error', (err) => {
      // If mutation causes parsing issues, this will catch it
      done(new Error(`Parsing error: ${err.message}`));
    });

    // Verify the load event fires within reasonable time
    setTimeout(() => {
      if (!parsingComplete) {
        done(new Error('Database loading timed out'));
      }
    }, 200);
  });
});