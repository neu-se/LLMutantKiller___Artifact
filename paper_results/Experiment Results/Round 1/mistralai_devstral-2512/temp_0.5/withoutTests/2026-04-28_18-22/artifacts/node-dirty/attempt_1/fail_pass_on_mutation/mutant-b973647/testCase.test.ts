import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty error event emission', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event with correct event name when file read fails', (done) => {
    // Create a corrupted database file
    fs.writeFileSync(dbPath, 'corrupted data that will cause parse error\n');

    const dirty = new Dirty(dbPath);

    // Listen for the error event with the correct event name
    dirty.on('error', (err) => {
      expect(err).toBeInstanceOf(Error);
      done();
    });

    // The mutation changes 'error' to '', which means the error event won't be emitted
    // This test will timeout if the mutation is present because the error callback won't fire
  });
});