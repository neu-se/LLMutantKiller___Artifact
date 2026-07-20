import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database load behavior', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event when database file ends with incomplete row', (done) => {
    // Create a database file with an incomplete row (no newline at end)
    const incompleteData = '{"key":"test","val":"value"}';
    fs.writeFileSync(dbPath, incompleteData);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    db.on('load', () => {
      // This should not be reached if error is properly emitted
      done(new Error('Expected error event but got load event instead'));
    });
  });
});