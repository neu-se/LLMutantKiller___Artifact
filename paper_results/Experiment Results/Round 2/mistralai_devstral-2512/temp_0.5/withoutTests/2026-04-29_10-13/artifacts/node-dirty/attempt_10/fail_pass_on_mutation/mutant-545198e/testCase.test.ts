import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database chunk processing', () => {
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

  it('should not process incomplete lines when chunk contains no newlines', (done) => {
    // Create a file with data that doesn't contain any newlines
    const dataWithoutNewlines = '{"key":"test","val":"data"}';
    fs.writeFileSync(dbPath, dataWithoutNewlines);

    const db = new Dirty(dbPath);
    let loadFired = false;
    let errorFired = false;

    db.on('load', (size) => {
      if (loadFired) return;
      loadFired = true;
      // In original code, this should not be reached for incomplete lines
      // In mutated code, this will be reached with size 1
      expect(size).toBe(0);
      if (!errorFired) {
        done(new Error('Expected error event for incomplete line'));
      }
    });

    db.on('error', (err) => {
      if (errorFired) return;
      errorFired = true;
      // Original code should emit error for incomplete line
      expect((err as Error).message).toContain('Corrupted row at the end of the db');
      if (!loadFired) {
        done();
      }
    });

    setTimeout(() => {
      if (!loadFired && !errorFired) {
        done(new Error('Test timed out - no events fired'));
      }
    }, 200);
  });
});