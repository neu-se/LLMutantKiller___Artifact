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

  it('should emit error when loading corrupted row without key', (done) => {
    // Create a corrupted database file with a row missing the 'key' field
    const corruptedData = JSON.stringify({ val: "some value" }) + '\n';
    fs.writeFileSync(dbPath, corruptedData);

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });

    db.on('load', () => {
      done(new Error('Load event should not be emitted for corrupted data'));
    });
  });
});