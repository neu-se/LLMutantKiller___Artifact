import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database empty line handling', () => {
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

  it('should handle empty lines in database file by skipping them', (done) => {
    // Create a database file with an empty line
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}\n\n{"key":"test2","val":"value2"}\n', 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      // Should successfully load 2 entries despite the empty line
      expect(size).toBe(2);
      expect(db.get('test')).toBe('value');
      expect(db.get('test2')).toBe('value2');
      done();
    });

    db.on('error', (error) => {
      done(new Error(`Unexpected error: ${error.message}`));
    });
  });
});