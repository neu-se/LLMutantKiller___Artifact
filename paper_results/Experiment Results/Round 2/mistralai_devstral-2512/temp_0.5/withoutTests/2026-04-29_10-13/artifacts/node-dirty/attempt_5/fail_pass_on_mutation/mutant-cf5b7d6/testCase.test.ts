import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database load', () => {
  it('should correctly parse valid rows and skip malformed ones', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory with valid and malformed JSON
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n{"invalid":json}\n{"key":"testKey2","val":"testValue2"}\n');

    const db = new Dirty(dbPath);
    let errorCount = 0;

    db.on('error', (err) => {
      errorCount++;
      // We expect one error for the malformed row
      if (errorCount > 1) {
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done(new Error(`Unexpected additional error: ${err.message}`));
      }
    });

    db.on('load', (size) => {
      try {
        // Should load 2 valid rows
        expect(size).toBe(2);
        expect(db.get('testKey')).toBe('testValue');
        expect(db.get('testKey2')).toBe('testValue2');
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done();
      } catch (error) {
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done(error);
      }
    });
  });
});