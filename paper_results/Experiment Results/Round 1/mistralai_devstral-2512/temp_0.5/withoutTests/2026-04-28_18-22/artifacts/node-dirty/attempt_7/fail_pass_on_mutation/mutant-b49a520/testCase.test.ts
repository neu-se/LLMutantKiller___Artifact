import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('should correctly handle chunks without newlines during loading', (done) => {
    // Create a database file with multiple lines, last one without newline
    const content = '{"key":"a","val":1}\n{"key":"b","val":2}\n{"key":"c","val":3}';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const dirty = new Dirty(dbPath);
    let errorCount = 0;
    let loadCount = 0;

    dirty.on('error', (err) => {
      errorCount++;
      // Original code should emit exactly one error for the corrupted row at end
      expect(err.message).toBe('Corrupted row at the end of the db: {"key":"c","val":3}');
    });

    dirty.on('load', (size) => {
      loadCount++;
      // Original code should load 2 items (last one is corrupted)
      expect(size).toBe(2);
      expect(dirty.get('a')).toBe(1);
      expect(dirty.get('b')).toBe(2);
      expect(dirty.get('c')).toBeUndefined();
      expect(errorCount).toBe(1);

      if (loadCount === 1 && errorCount === 1) {
        done();
      }
    });
  });
});