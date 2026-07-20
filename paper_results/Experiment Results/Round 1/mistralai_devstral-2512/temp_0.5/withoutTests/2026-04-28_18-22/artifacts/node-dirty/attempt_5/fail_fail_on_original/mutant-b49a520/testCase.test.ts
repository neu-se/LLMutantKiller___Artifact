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

  it('should process chunks without newlines correctly', (done) => {
    // Create a database file with content that will trigger the chunk processing
    const content = '{"key":"test","val":42}';
    fs.writeFileSync(dbPath, content, 'utf-8');

    const dirty = new Dirty(dbPath);
    let errorCount = 0;

    dirty.on('error', (err) => {
      errorCount++;
      // Original code should emit exactly one error for the corrupted row at end
      expect(err.message).toBe('Corrupted row at the end of the db: {"key":"test","val":42}');
    });

    dirty.on('load', (size) => {
      // Original code should load 0 items (all data is corrupted)
      expect(size).toBe(0);
      expect(errorCount).toBe(1);
      done();
    });

    // Timeout to ensure test fails if callbacks aren't called
    setTimeout(() => {
      throw new Error('Test timed out - callbacks not called');
    }, 1000);
  });
});