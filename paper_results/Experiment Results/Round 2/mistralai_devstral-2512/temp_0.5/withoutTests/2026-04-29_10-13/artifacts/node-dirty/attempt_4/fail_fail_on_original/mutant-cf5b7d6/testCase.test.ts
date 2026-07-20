import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load', () => {
  it('should handle malformed JSON rows without emitting error', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory with malformed JSON
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n{"invalid":json}\n');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        expect(size).toBe(1);
        expect(db.get('testKey')).toBe('testValue');
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done();
      } catch (error) {
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done(error);
      }
    });

    db.on('error', (err) => {
      db.close();
      fs.rmSync(testDir, { recursive: true, force: true });
      done(new Error(`Unexpected error: ${err.message}`));
    });
  });
});