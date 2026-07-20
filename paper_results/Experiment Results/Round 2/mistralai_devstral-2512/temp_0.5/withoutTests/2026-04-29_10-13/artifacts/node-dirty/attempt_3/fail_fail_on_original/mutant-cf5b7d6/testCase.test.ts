import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database load', () => {
  it('should correctly handle malformed JSON rows during load', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory with malformed JSON
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n{"invalid":json}\n');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // In original code, malformed rows are skipped and empty string is returned
        // In mutated code, "Stryker was here!" is returned instead
        expect(size).toBe(1);
        expect(db.get('testKey')).toBe('testValue');
        db.close();
        rimraf.sync(testDir);
        done();
      } catch (error) {
        db.close();
        rimraf.sync(testDir);
        done(error);
      }
    });

    db.on('error', (err) => {
      db.close();
      rimraf.sync(testDir);
      done(err);
    });
  });
});