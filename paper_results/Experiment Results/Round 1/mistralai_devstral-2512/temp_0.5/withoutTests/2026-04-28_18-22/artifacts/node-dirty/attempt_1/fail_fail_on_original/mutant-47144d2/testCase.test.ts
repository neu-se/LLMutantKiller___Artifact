import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database empty line handling', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit error when encountering empty lines in database file', (done) => {
    // Create a database file with an empty line
    fs.writeFileSync(dbPath, '{"key":"test","val":123}\n\n{"key":"test2","val":456}\n');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Empty lines never appear in a healthy database');
      done();
    });

    db.on('load', () => {
      // This should not be reached if error is properly emitted
      done(new Error('Expected error event but got load event instead'));
    });
  });
});