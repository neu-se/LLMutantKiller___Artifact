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

  it('should not process data when chunk has no newline', () => {
    // Create a test database file with data that has no newlines
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    return new Promise<void>((resolve, reject) => {
      const db = new Dirty(dbPath);
      let loadEventCount = 0;
      let errorEventCount = 0;

      db.on('load', (size) => {
        loadEventCount++;
        // Original code should have size 0 (no complete lines processed)
        // Mutated code will have size 1 (incomplete line processed)
        if (size !== 0) {
          reject(new Error(`Expected size 0 but got ${size}`));
          return;
        }

        if (errorEventCount > 0) {
          resolve();
        }
      });

      db.on('error', (err) => {
        errorEventCount++;
        // Original code should emit error for incomplete line
        if (!err.message.includes('Corrupted row at the end of the db')) {
          reject(new Error(`Unexpected error: ${err.message}`));
          return;
        }

        if (loadEventCount > 0) {
          resolve();
        }
      });

      setTimeout(() => {
        reject(new Error('Test timed out - neither load nor error event fired'));
      }, 1000);
    });
  });
});