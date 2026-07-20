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

  it('should not process incomplete lines without newline', () => {
    // Create a test database file with an incomplete line (no trailing newline)
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    return new Promise((resolve, reject) => {
      const db = new Dirty(dbPath);
      let loadCalled = false;

      db.on('load', (size) => {
        if (loadCalled) return;
        loadCalled = true;

        // The original code should not process the incomplete line
        expect(size).toBe(0);
        expect(db.get('testKey')).toBeUndefined();
        resolve();
      });

      db.on('error', (err) => {
        if (!loadCalled) {
          reject(err);
        }
      });

      // Add timeout to prevent hanging
      setTimeout(() => {
        if (!loadCalled) {
          reject(new Error('Load event was not fired within expected time'));
        }
      }, 1000);
    });
  });
});