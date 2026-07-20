import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database loading', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should handle partial lines during database loading', (done) => {
    // Create a database file with a partial line (no trailing newline)
    const partialData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, partialData);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err.message).toBe('Corrupted row at the end of the db: ' + partialData);
      done();
    });

    db.on('load', () => {
      // This should not be reached if the error is properly detected
      done(new Error('Expected error event for corrupted data, but got load event instead'));
    });
  });
});