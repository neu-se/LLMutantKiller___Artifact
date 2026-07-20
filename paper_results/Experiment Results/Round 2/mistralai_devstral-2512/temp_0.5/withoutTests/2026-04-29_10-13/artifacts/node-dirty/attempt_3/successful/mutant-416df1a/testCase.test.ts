import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty error emission on write failure', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    try {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  it('should emit error when write fails with no callbacks', (done) => {
    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Create a mock write stream that will fail
      const originalWriteStream = db._writeStream;
      const mockWriteStream = {
        write: (data: any, callback: (err?: Error) => void) => {
          // Simulate a write error
          setImmediate(() => callback(new Error('Mock write error')));
          return true;
        },
        cork: () => {},
        uncork: () => {},
        on: (event: string, handler: Function) => {
          if (event === 'drain') {
            setImmediate(handler);
          }
          return mockWriteStream;
        },
        end: (callback?: Function) => {
          if (callback) callback();
        },
        destroy: () => {}
      };
      db._writeStream = mockWriteStream as any;

      // Track error emission
      let errorEmitted = false;
      db.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        expect(err.message).toBe('Mock write error');
      });

      // Set value without callback
      db.set('test-key', { data: 'test-value' });

      // Wait for async operations
      setTimeout(() => {
        if (!errorEmitted) {
          done(new Error('Error event was not emitted when expected'));
        } else {
          done();
        }
      }, 100);
    });
  });
});