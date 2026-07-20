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

  it('should handle incomplete lines without newline by treating them as corrupted', () => {
    // Create a test database file with an incomplete line (no trailing newline)
    const testData = '{"key":"testKey","val":"testValue"}';
    fs.writeFileSync(dbPath, testData);

    return new Promise<void>((resolve, reject) => {
      const db = new Dirty(dbPath);

      db.on('error', (err) => {
        // The original code should emit an error for incomplete lines
        expect(err.message).toContain('Corrupted row at the end of the db');
        resolve();
      });

      db.on('load', (size) => {
        // This should not be called before error
        reject(new Error('Load event should not be called before error for corrupted data'));
      });

      // Add timeout to prevent hanging
      setTimeout(() => {
        reject(new Error('Neither error nor load event was fired within expected time'));
      }, 1000);
    });
  });
});