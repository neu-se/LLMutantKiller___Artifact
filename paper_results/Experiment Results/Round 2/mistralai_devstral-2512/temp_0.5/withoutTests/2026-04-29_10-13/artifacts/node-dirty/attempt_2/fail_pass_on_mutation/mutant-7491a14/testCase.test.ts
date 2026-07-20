import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database encoding', () => {
  it('should fail to read non-ASCII characters when encoding is not specified', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Clean up any existing test directory
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    // Create a test database file with non-ASCII UTF-8 content
    const testData = '{"key":"testKey","val":"café"}\n';
    fs.writeFileSync(dbPath, testData, 'utf-8');

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      try {
        // This should pass on original code (UTF-8 encoding)
        // but fail on mutated code (default encoding which may not handle non-ASCII)
        expect(db.get('testKey')).toBe('café');

        // Clean up
        db.close();
        rimraf.sync(testDir);
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