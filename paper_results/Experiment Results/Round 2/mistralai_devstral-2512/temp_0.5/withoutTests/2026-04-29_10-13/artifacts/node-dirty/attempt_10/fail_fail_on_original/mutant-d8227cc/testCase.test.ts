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

  it('should handle chunks without newlines during streaming', (done) => {
    // Create a file with multiple chunks to trigger the specific code path
    const data = '{"key":"a","val":1}\n{"key":"b","val":2}\n{"key":"c","val":3}';
    fs.writeFileSync(dbPath, data, 'utf-8');

    const db = new Dirty(dbPath);
    let loadCount = 0;
    let errorCount = 0;

    db.on('load', (size) => {
      loadCount++;
      // Original code should load 2 complete entries (last one is incomplete)
      expect(size).toBe(2);
      expect(db.get('a')).toBe(1);
      expect(db.get('b')).toBe(2);
      expect(db.get('c')).toBeUndefined();

      if (loadCount === 1 && errorCount === 1) {
        done();
      }
    });

    db.on('error', (err) => {
      errorCount++;
      // Original code should emit exactly one error for the incomplete line
      expect(err.message).toContain('Corrupted row at the end of the db');

      if (loadCount === 1 && errorCount === 1) {
        done();
      }
    });

    // Safety timeout
    setTimeout(() => {
      done(new Error('Test timed out'));
    }, 200);
  });
});