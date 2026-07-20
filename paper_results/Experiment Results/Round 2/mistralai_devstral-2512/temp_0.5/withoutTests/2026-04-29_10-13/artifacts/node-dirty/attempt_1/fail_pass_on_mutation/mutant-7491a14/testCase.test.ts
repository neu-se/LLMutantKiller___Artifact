import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database initialization', () => {
  it('should properly initialize with UTF-8 encoding when reading the database file', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with UTF-8 encoded content
    const testData = '{"key":"testKey","val":"testValue"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // Verify the data was loaded correctly
        expect(size).toBe(1);
        expect(db.get('testKey')).toBe('testValue');

        // Clean up
        db.close();
        rimraf.sync(testDir);
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      done(err);
    });
  });
});