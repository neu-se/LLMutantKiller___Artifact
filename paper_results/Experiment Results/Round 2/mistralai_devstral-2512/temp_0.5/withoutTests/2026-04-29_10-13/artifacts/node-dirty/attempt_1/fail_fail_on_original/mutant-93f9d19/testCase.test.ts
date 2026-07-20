import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach((done) => {
    rimraf(testDir, done);
  });

  it('should emit error event with correct event name when corrupted row at end of file', (done) => {
    // Create a database file with a corrupted row at the end (no newline)
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Corrupted row at the end of the db');
      done();
    });

    db.on('load', () => {
      // This should not be called if there's an error
      done(new Error('Expected error event but got load event'));
    });
  });
});