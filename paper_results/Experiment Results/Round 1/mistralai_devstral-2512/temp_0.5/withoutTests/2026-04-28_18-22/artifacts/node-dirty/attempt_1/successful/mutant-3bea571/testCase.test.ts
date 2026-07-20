import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error event', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event with correct event name when empty line is encountered', (done) => {
    // Create a database file with an empty line
    fs.writeFileSync(dbPath, '\n', 'utf-8');

    const db = new Dirty(dbPath);

    // Listen for error event
    db.on('error', (error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Empty lines never appear in a healthy database');
      done();
    });

    // The mutation changes the event name from 'error' to empty string
    // This test will fail on the mutant because the error handler won't be triggered
    // with the correct event name
  });
});