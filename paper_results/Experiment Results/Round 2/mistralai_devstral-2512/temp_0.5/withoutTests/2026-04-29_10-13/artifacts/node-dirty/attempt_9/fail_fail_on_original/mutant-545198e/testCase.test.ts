import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
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

  it('should not process incomplete lines when chunk contains no newlines', (done) => {
    // Create a file with data that doesn't contain any newlines
    const dataWithoutNewlines = '{"key":"test","val":"data"}';
    fs.writeFileSync(dbPath, dataWithoutNewlines);

    const db = new Dirty(dbPath);
    let results = { loadSize: null, error: null };

    db.on('load', (size) => {
      results.loadSize = size;
      checkResults();
    });

    db.on('error', (err) => {
      results.error = err;
      checkResults();
    });

    function checkResults() {
      if (results.loadSize !== null && results.error !== null) {
        // Both events fired - this shouldn't happen
        done(new Error('Both load and error events fired'));
      } else if (results.error !== null) {
        // Original code path - error should be thrown for incomplete line
        expect(results.error.message).toContain('Corrupted row at the end of the db');
        expect(results.loadSize).toBeNull();
        done();
      } else if (results.loadSize !== null) {
        // Mutated code path - load fires with incorrect size
        expect(results.loadSize).toBe(0);
        done(new Error('Expected error event for incomplete line, but got load event'));
      }
    }

    setTimeout(() => {
      if (results.loadSize === null && results.error === null) {
        done(new Error('Test timed out - no events fired'));
      }
    }, 200);
  });
});