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

  it('should reject database rows without key field', (done) => {
    // Create a database with a valid row followed by an invalid row (missing key)
    const validRow = JSON.stringify({ key: "valid", val: "value" }) + '\n';
    const invalidRow = JSON.stringify({ val: "no key" }) + '\n';
    fs.writeFileSync(dbPath, validRow + invalidRow);

    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      // The original code should emit an error for the invalid row
      // The mutated code will not emit this error
      if (errorCount === 1) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toContain('Could not load corrupted row');
        done();
      }
    });

    // If no error is emitted within 100ms, the test fails
    setTimeout(() => {
      if (errorCount === 0) {
        done(new Error('Expected error for missing key was not emitted'));
      }
    }, 100);
  });
});