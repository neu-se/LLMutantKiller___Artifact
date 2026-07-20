import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    try {
      fs.rmSync(testDir, { recursive: true, force: true });
    } catch (err) {
      // Ignore errors during cleanup
    }
  });

  it('should emit error event when write stream encounters an error with no callbacks', (done) => {
    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Override the write stream to simulate an error
      const originalWrite = db._writeStream!.write;
      db._writeStream!.write = (data: any, callback?: (error: Error | null) => void) => {
        const error = new Error('Simulated write error');
        if (callback) {
          callback(error);
        }
        return false;
      };

      db.on('error', (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Simulated write error');
        done();
      });

      // Set a value without a callback to trigger the error condition
      db.set('test-key', { value: 'test-value' });
    });
  });
});