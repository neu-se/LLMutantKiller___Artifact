import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  it('should fail to read BOM-marked UTF-8 files when encoding is not specified', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with UTF-8 BOM (which should be handled by explicit UTF-8 encoding)
    const testData = '\uFEFF{"key":"testKey","val":"testValue"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // With explicit UTF-8 encoding (original), BOM should be handled
        // Without encoding (mutated), BOM may cause parsing issues
        expect(db.get('testKey')).toBe('testValue');

        // Clean up
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done();
      } catch (error) {
        done(error);
      }
    });

    db.on('error', (err) => {
      // If we get an error, it means the mutation caused a problem with BOM handling
      done(err);
    });
  });
});