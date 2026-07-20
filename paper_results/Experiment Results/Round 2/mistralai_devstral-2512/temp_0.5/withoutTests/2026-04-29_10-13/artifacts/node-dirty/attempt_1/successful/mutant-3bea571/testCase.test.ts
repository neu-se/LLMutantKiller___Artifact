import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  it('should emit error event with correct event name when encountering empty line', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Create test directory
    fs.mkdirSync(testDir, { recursive: true });

    // Create a database file with an empty line
    fs.writeFileSync(dbPath, '\n', 'utf-8');

    const db = new Dirty(dbPath);

    // Listen for error event
    db.on('error', (error) => {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Empty lines never appear in a healthy database');
      db.close();
      rimraf.sync(testDir);
      done();
    });

    // Listen for load event to ensure we don't get stuck
    db.on('load', () => {
      db.close();
      rimraf.sync(testDir);
      done(new Error('Expected error event was not emitted'));
    });
  });
});