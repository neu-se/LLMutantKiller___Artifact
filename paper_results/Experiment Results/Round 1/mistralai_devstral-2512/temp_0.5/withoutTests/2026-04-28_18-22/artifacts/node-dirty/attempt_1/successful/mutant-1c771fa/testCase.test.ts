import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event when encountering corrupted data', (done) => {
    // Create a database file with corrupted JSON data
    fs.writeFileSync(dbPath, '{"key":"test","val":123}\ncorrupted data\n{"key":"test2","val":456}\n');

    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });

    db.on('load', () => {
      if (!errorEmitted) {
        done(new Error('Expected error event was not emitted for corrupted data'));
      }
    });
  });
});