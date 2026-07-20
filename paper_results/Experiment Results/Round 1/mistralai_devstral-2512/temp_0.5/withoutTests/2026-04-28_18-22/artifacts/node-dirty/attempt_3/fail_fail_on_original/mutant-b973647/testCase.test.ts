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
    let errorEventFired = false;
    let emptyEventFired = false;

    // Listen for the correct error event
    dirty.on('error', (err) => {
      errorEventFired = true;
      expect(err).toBeInstanceOf(Error);
      // Verify the empty event was NOT fired
      expect(emptyEventFired).toBe(false);
      done();
    });

    // Listen for empty string event (mutated behavior)
    dirty.on('', (err) => {
      emptyEventFired = true;
      // If this fires, the mutation is present
      done(new Error('Mutation detected: error event was emitted with empty string event name'));
    });

    // Timeout to fail if neither event fires
    setTimeout(() => {
      done(new Error('No error event was emitted'));
    }, 1000);
  });
});