import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should correctly handle chunks without newlines during streaming', (done) => {
    // Create a file with data that will trigger the chunk processing
    const chunkWithoutNewline = '{"key":"test","val":"value"}';
    fs.writeFileSync(dbPath, chunkWithoutNewline, 'utf-8');

    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      // Original code should emit exactly one error for the incomplete line
      // Mutated code will behave differently due to incorrect newline check
      if (errorCount === 1) {
        expect(err.message).toContain('Corrupted row at the end of the db');
      } else {
        done(new Error(`Unexpected error count: ${errorCount}`));
      }
    });

    db.on('load', (size) => {
      // Original code should complete loading with size 0 (no complete lines)
      // Mutated code will have different behavior
      expect(size).toBe(0);
      expect(errorCount).toBe(1);
      done();
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 200);
  });
});