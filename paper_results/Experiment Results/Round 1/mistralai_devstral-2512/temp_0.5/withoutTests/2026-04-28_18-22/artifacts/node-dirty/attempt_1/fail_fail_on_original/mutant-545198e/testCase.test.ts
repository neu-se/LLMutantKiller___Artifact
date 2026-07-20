import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database file loading', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should handle incomplete lines at the end of the file correctly', (done) => {
    // Create a test database file with an incomplete line (no trailing newline)
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    const db = new Dirty(dbPath);

    db.on('load', (size) => {
      // The original code should not emit an error for incomplete lines
      // and should not process the incomplete line
      expect(size).toBe(0);
      done();
    });

    db.on('error', (err) => {
      done.fail('Unexpected error event emitted');
    });
  });
});