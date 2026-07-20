import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database encoding', () => {
  it('should fail when reading file without explicit UTF-8 encoding with special characters', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with UTF-8 encoded content containing special characters
    const testData = '{"key":"testKey","val":"café"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    // Temporarily override createReadStream to simulate the mutation
    const originalCreateReadStream = fs.createReadStream;
    fs.createReadStream = function(path, options) {
      return originalCreateReadStream.call(fs, path, {});
    };

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // This should pass on original code but fail on mutated code
        expect(db.get('testKey')).toBe('café');

        // Clean up
        db.close();
        fs.rmSync(testDir, { recursive: true, force: true });
        done();
      } catch (error) {
        done(error);
      } finally {
        // Restore original function
        fs.createReadStream = originalCreateReadStream;
      }
    });

    db.on('error', (err) => {
      // Restore original function before failing
      fs.createReadStream = originalCreateReadStream;
      done(err);
    });
  });
});