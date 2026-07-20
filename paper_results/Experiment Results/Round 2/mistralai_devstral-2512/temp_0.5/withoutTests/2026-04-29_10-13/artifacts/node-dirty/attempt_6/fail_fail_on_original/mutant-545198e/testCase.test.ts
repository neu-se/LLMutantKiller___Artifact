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

  it('should skip processing when chunk contains no newlines', (done) => {
    // Create a file with multiple chunks that don't contain newlines
    const chunk1 = '{"key":"a","val":1';
    const chunk2 = '{"key":"b","val":2';
    fs.writeFileSync(dbPath, chunk1 + chunk2);

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      // Original: size should be 0 (no complete lines processed)
      // Mutated: size will be 2 (incorrectly processes incomplete lines)
      expect(size).toBe(0);
      done();
    });

    db.on('error', (err) => {
      // Original should emit error for corrupted data at end
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });
  });
});