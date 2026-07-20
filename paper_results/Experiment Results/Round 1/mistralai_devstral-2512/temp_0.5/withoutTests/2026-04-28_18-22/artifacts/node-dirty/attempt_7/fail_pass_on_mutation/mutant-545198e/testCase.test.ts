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

  it('should process complete lines and handle incomplete lines correctly', () => {
    // Create a test database file with one complete line and one incomplete line
    const testData = '{"key":"completeKey","val":"completeValue"}\n{"key":"incompleteKey","val":"incompleteValue"}';
    fs.writeFileSync(dbPath, testData);

    return new Promise<void>((resolve, reject) => {
      const db = new Dirty(dbPath);
      let errorReceived = false;

      db.on('error', (err) => {
        // The original code should emit an error for the incomplete line
        expect(err.message).toContain('Corrupted row at the end of the db');
        errorReceived = true;
      });

      db.on('load', (size) => {
        // The original code should process the complete line before the error
        expect(size).toBe(1);
        expect(db.get('completeKey')).toEqual('completeValue');
        expect(db.get('incompleteKey')).toBeUndefined();

        if (errorReceived) {
          resolve();
        } else {
          reject(new Error('Error event should be emitted for incomplete line'));
        }
      });

      // Add timeout to prevent hanging
      setTimeout(() => {
        reject(new Error('Test timed out'));
      }, 1000);
    });
  });
});