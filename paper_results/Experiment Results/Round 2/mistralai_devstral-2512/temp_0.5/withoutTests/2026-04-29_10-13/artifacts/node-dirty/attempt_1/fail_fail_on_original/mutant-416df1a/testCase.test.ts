import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty error emission on write failure', () => {
  const testDir = path.join(__dirname, 'test-dirty-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeAll(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    rimraf.sync(testDir);
  });

  it('should emit error event when write fails and no callbacks are registered', (done) => {
    const db = new Dirty(dbPath);
    db.on('load', () => {
      // Force a write error by making the directory read-only after load
      fs.chmodSync(testDir, 0o444);

      // Set a value without a callback
      db.set('test-key', { data: 'test-value' });

      // Listen for error event
      db.on('error', (err) => {
        expect(err).toBeDefined();
        // Restore directory permissions for cleanup
        fs.chmodSync(testDir, 0o755);
        done();
      });

      // Set a timeout to fail the test if error is not emitted
      setTimeout(() => {
        fs.chmodSync(testDir, 0o755);
        done(new Error('Error event was not emitted'));
      }, 1000);
    });
  });
});