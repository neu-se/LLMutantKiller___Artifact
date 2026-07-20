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

  it('should correctly handle return values during row parsing', (done) => {
    // Create a database file that will trigger the return statement
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}\n');

    const db = new Dirty(dbPath);
    let loadFired = false;

    db.on('load', (size) => {
      loadFired = true;
      // The original code returns '' which doesn't affect behavior
      // The mutated code returns a string that might interfere
      expect(size).toBe(1);
      expect(db.get('test')).toBe('value');
      done();
    });

    db.on('error', (err) => {
      // If the mutation causes issues with the return value, this will catch it
      done(new Error(`Unexpected error: ${err.message}`));
    });

    // Timeout to ensure test fails if load doesn't fire
    setTimeout(() => {
      if (!loadFired) {
        done(new Error('Load event never fired'));
      }
    }, 100);
  });
});