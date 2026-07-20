import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty database error handling', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    try {
      fs.rmSync(testDir, { recursive: true, force: true });
    } catch (err) {
      // Ignore cleanup errors
    }
  });

  it('should emit error event when write fails with no callbacks', (done) => {
    const db = new Dirty(dbPath);
    let errorEmitted = false;

    db.on('load', () => {
      // Override the write method to simulate an error
      const originalWrite = db._writeStream.write;
      db._writeStream.write = function(data, callback) {
        setImmediate(() => callback(new Error('Simulated write error')));
        return true;
      };

      // Set a value without callback to trigger the error condition
      db.set('test-key', { data: 'test' });

      // Check if error was emitted
      setImmediate(() => {
        if (!errorEmitted) {
          done(new Error('Expected error event was not emitted'));
        }
      });
    });

    db.on('error', (err) => {
      errorEmitted = true;
      expect(err).toBeDefined();
      expect(err.message).toBe('Simulated write error');
      done();
    });

    // Add timeout to prevent hanging
    setTimeout(() => {
      if (!errorEmitted) {
        done(new Error('Test timed out waiting for error event'));
      }
    }, 1000);
  });
});