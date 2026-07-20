import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database file loading', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
  });

  it('should correctly handle data chunks without newlines', () => {
    // Create a test database file with data that has no newlines
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    return new Promise<void>((resolve, reject) => {
      const db = new Dirty(dbPath);
      let loadCalled = false;
      let errorCalled = false;

      db.on('load', (size) => {
        loadCalled = true;
        // In original code, this should be 0 because the line is incomplete
        // In mutated code, this will be 1 because it processes the incomplete line
        expect(size).toBe(0);
        if (errorCalled) {
          resolve();
        }
      });

      db.on('error', (err) => {
        errorCalled = true;
        // Original code should emit error for incomplete line
        expect(err.message).toContain('Corrupted row at the end of the db');
        if (loadCalled) {
          resolve();
        }
      });

      setTimeout(() => {
        reject(new Error('Test timed out'));
      }, 1000);
    });
  });
});