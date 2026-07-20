import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database loading', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should properly handle data chunks without newlines', (done) => {
    // Create a database file with data that doesn't end with newline
    const dataWithoutNewline = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, dataWithoutNewline);

    const db = new Dirty(dbPath);
    let loadEventFired = false;
    let errorEventFired = false;

    db.on('error', (err) => {
      errorEventFired = true;
      expect(err.message).toContain('Corrupted row at the end of the db');
      // In original code, this should fire because the partial line isn't processed
      // In mutated code, this won't fire because the check is disabled
    });

    db.on('load', (size) => {
      loadEventFired = true;
      // In original code, this should fire with size 0 (no complete lines processed)
      // In mutated code, this will fire with size 1 (partial line processed incorrectly)
      expect(size).toBe(0);
      expect(errorEventFired).toBe(true);
      done();
    });
  });
});