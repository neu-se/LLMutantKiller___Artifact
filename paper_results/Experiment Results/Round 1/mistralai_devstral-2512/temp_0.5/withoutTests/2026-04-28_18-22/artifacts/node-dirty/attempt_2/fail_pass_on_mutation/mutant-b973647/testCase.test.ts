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
    let errorEmitted = false;

    // Listen for the error event with the correct event name
    dirty.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeInstanceOf(Error);
      done();
    });

    // Also listen for any empty string events (which would be the mutated behavior)
    dirty.on('', (err) => {
      // If this callback is triggered, the mutation is present
      done(new Error('Mutation detected: error event was emitted with empty string event name'));
    });

    // Set a timeout to fail the test if neither callback is triggered
    setTimeout(() => {
      if (!errorEmitted) {
        done(new Error('No error event was emitted'));
      }
    }, 1000);
  });
});