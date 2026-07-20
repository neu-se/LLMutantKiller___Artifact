import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  it('should emit error event when corrupted row is encountered', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Write a database file with a corrupted row
    fs.writeFileSync(dbPath, '{"key":"test","val":1}\n{invalid json}\n', 'utf-8');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err.message).toContain("Could not load corrupted row");
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error("Expected error event was not emitted"));
        return;
      }
      expect(db.get('test')).toBe(1);
      done();
    });
  });
});