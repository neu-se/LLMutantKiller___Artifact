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

  it('should return early when chunk has no newline', () => {
    // Create a test database file with data that has no newlines
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    return new Promise<void>((resolve, reject) => {
      const db = new Dirty(dbPath);
      let hasProcessedData = false;

      // Spy on the internal _data processing
      const originalSet = db._data.set.bind(db._data);
      db._data.set = function(key, value) {
        hasProcessedData = true;
        return originalSet(key, value);
      };

      db.on('load', (size) => {
        // Original code should not process any data (size should be 0)
        // Mutated code will process the incomplete line (size will be 1)
        if (size === 0 && !hasProcessedData) {
          resolve();
        } else {
          reject(new Error(`Expected no data processing but got size ${size}`));
        }
      });

      db.on('error', (err) => {
        // Original code should emit error for incomplete line
        if (err.message.includes('Corrupted row at the end of the db') && !hasProcessedData) {
          resolve();
        } else {
          reject(new Error(`Unexpected error or data was processed: ${err.message}`));
        }
      });

      setTimeout(() => {
        reject(new Error('Test timed out'));
      }, 1000);
    });
  });
});