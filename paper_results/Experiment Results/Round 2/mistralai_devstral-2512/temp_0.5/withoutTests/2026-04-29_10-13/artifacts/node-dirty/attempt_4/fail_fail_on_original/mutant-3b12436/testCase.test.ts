import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database key validation', () => {
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

  it('should handle missing key field in database row', (done) => {
    // Create a database with a row that has val but no key
    const dataWithoutKey = JSON.stringify({ val: "test" }) + '\n';
    fs.writeFileSync(dbPath, dataWithoutKey);

    const db = new Dirty(dbPath);

    // The original code should emit an error when trying to parse this row
    // The mutated code will silently ignore the missing key check
    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });

    // If no error is emitted within 100ms, the test fails
    setTimeout(() => {
      done(new Error('Expected error for missing key was not emitted'));
    }, 100);
  });
});