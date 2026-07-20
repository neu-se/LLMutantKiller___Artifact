import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event when encountering corrupted data during load', (done) => {
    // Create a corrupted database file with invalid JSON
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"\n{"invalid":json\n');

    const db = new Dirty(dbPath);

    db.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toContain('Could not load corrupted row');
      done();
    });

    db.on('load', () => {
      fail('Should not emit load event when encountering corrupted data');
      done();
    });
  });
});