import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
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

  it('should throw error when loading row without key field', (done) => {
    // Create a database file with a row missing the 'key' field
    const invalidData = JSON.stringify({ val: "test value" }) + '\n';
    fs.writeFileSync(dbPath, invalidData);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      // In original code, this should be called with a parsing error
      // In mutated code, this won't be called because the check is removed
      expect(err).toBeInstanceOf(Error);
      done();
    });

    // Set a timeout to fail the test if error event isn't emitted
    setTimeout(() => {
      done(new Error('Expected error event was not emitted'));
    }, 100);
  });
});