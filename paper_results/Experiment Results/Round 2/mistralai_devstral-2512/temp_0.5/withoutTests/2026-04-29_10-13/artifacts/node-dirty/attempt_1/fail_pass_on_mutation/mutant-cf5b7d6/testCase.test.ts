import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database load', () => {
  it('should correctly parse and load valid data from file', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Setup: Create test directory and write valid data
    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(dbPath, '{"key":"testKey","val":"testValue"}\n');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
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