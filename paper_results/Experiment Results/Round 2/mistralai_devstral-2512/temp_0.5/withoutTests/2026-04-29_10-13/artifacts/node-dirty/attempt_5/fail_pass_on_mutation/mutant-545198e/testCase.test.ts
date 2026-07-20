import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database loading', () => {
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

  it('should not process incomplete lines when no newline exists in chunk', (done) => {
    // Create a database file with a single line without trailing newline
    const incompleteData = '{"key":"test","val":"data"}';
    fs.writeFileSync(dbPath, incompleteData);

    const db = new Dirty(dbPath);
    let hasError = false;
    let hasLoad = false;

    db.on('error', (err) => {
      hasError = true;
      // Original code should detect this as corrupted
      expect(err.message).toContain('Corrupted row at the end of the db');
      if (!hasLoad) {
        done();
      }
    });

    db.on('load', (size) => {
      hasLoad = true;
      // Original code should have size 0 (no complete lines)
      // Mutated code will have size 1 (incorrectly processes incomplete line)
      expect(size).toBe(0);
      if (!hasError) {
        done(new Error('Expected error event for incomplete line'));
      }
    });

    setTimeout(() => {
      if (!hasError && !hasLoad) {
        done(new Error('Test timed out - no events fired'));
      }
    }, 200);
  });
});