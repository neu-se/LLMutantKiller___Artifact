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
    let loadCalled = false;
    let errorCalled = false;

    dirty.on('error', (err) => {
      errorCalled = true;
      // Original code should emit error for corrupted row at end
      expect(err.message).toContain('Corrupted row at the end of the db');
    });

    dirty.on('load', (size) => {
      loadCalled = true;
      // Original code should load 2 items (last one is corrupted)
      expect(size).toBe(2);
      expect(dirty.get('a')).toBe(1);
      expect(dirty.get('b')).toBe(2);
      expect(dirty.get('c')).toBeUndefined();

      if (errorCalled) {
        done();
      }
    });

    // Timeout to ensure test fails if callbacks aren't called
    setTimeout(() => {
      if (!loadCalled || !errorCalled) {
        throw new Error('Test timed out - callbacks not called');
      }
    }, 1000);
  });
});