import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load', () => {
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

  it('should properly handle valid database entries', (done) => {
    // Create a valid database file with proper entries
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}\n{"key":"test2","val":"value2"}\n');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      expect(size).toBe(2);
      expect(db.get('test')).toBe('value');
      expect(db.get('test2')).toBe('value2');
      done();
    });

    db.on('error', (err) => {
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});