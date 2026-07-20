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

  it('should correctly handle data chunks without newlines during loading', (done) => {
    // Create a database file with data that doesn't contain any newlines
    const dataWithoutNewline = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, dataWithoutNewline);

    const db = new Dirty(dbPath);
    let loadCalled = false;
    let errorCalled = false;

    db.on('error', (err) => {
      if (errorCalled) return;
      errorCalled = true;
      // In original code: should emit error for corrupted row at end
      // In mutated code: won't emit this error because the check is disabled
      expect(err.message).toContain('Corrupted row at the end of the db');
      if (!loadCalled) {
        done();
      }
    });

    db.on('load', (size) => {
      if (loadCalled) return;
      loadCalled = true;
      // In original code: should load with size 0 (no complete lines)
      // In mutated code: will load with size 1 (incorrectly processes partial line)
      expect(size).toBe(0);
      if (!errorCalled) {
        done();
      }
    });

    // Timeout to ensure test fails if neither event fires
    setTimeout(() => {
      if (!loadCalled && !errorCalled) {
        done(new Error('Neither load nor error event fired'));
      }
    }, 100);
  });
});