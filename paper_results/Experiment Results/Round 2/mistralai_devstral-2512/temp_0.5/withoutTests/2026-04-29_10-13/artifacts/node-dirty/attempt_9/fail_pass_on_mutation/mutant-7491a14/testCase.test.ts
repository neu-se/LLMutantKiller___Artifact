import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  it('should correctly handle UTF-8 encoded data with emoji characters', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with UTF-8 encoded emoji
    const testData = '{"key":"testKey","val":"😀"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // Verify the data was loaded correctly with proper UTF-8 handling
        expect(db.get('testKey')).toBe('😀');

        // Clean up
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      // If we get an error, it means the mutation caused a problem
      done(err);
    });
  });
});