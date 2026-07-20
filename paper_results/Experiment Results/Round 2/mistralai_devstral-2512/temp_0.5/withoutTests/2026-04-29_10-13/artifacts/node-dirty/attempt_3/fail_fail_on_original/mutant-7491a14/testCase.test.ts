import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding', () => {
  it('should correctly handle UTF-8 encoded data with special characters', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with UTF-8 encoded content containing special characters
    const testData = '{"key":"testKey","val":"café\nrésumé"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // Verify the data was loaded correctly with proper UTF-8 handling
        expect(db.get('testKey')).toBe('café\nrésumé');

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