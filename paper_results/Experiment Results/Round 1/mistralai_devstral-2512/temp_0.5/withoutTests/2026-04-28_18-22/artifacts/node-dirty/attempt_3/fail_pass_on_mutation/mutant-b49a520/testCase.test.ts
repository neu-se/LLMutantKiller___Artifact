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

  it('should process data chunks without newlines correctly', (done) => {
    // Create a database file with a single line without trailing newline
    fs.writeFileSync(dbPath, '{"key":"test","val":42}', 'utf-8');

    const dirty = new Dirty(dbPath);
    let errorOccurred = false;

    dirty.on('error', (err) => {
      errorOccurred = true;
      expect(err.message).toBe('Corrupted row at the end of the db: {"key":"test","val":42}');
    });

    dirty.on('load', (size) => {
      // In original code, this should be called with size=0 (no data loaded)
      // In mutated code, it might behave differently
      expect(size).toBe(0);
      expect(errorOccurred).toBe(true);
      done();
    });
  });
});