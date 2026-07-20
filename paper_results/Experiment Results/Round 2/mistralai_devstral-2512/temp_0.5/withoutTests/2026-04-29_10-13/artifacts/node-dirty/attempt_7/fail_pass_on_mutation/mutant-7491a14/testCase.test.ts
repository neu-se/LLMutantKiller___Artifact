import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  it('should fail when reading file without explicit UTF-8 encoding', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with UTF-8 encoded content
    const testData = '{"key":"testKey","val":"testValue"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    // Force the file to be read with default encoding (mutated behavior)
    const originalCreateReadStream = fs.createReadStream;
    fs.createReadStream = function(path, options) {
      return originalCreateReadStream.call(fs, path, {});
    };

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // This should pass on original code but fail on mutated code
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
      // If we get an error, it means the mutation caused a problem
      done(err);
    });

    // Restore original function
    fs.createReadStream = originalCreateReadStream;
  });
});