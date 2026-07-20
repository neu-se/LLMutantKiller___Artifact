import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';

describe('Dirty error emission behavior', () => {
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
      // Make directory read-only to force write error
      fs.chmodSync(testDir, 0o444);

      // Track if error was emitted
      let errorEmitted = false;
      db.on('error', (err) => {
        errorEmitted = true;
        expect(err).toBeDefined();
        // Restore permissions
        fs.chmodSync(testDir, 0o755);
      });

      // Set value without callback (this should trigger error emission in original)
      db.set('test-key', { data: 'test-value' });

      // Wait for async operations
      setTimeout(() => {
        // Restore permissions for cleanup
        fs.chmodSync(testDir, 0o755);
        if (!errorEmitted) {
          done(new Error('Error event was not emitted when expected'));
        } else {
          done();
        }
      }, 500);
    });
  });
});