import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty database error handling', () => {
  it('should emit error event when write fails and no callbacks are registered', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    // Wait for initial load
    dirty.on('load', () => {
      // Force a write error by making the file read-only
      fs.chmodSync(dbPath, 0o444);

      // Set up error listener
      dirty.on('error', (err) => {
        expect(err).toBeDefined();
        fs.chmodSync(dbPath, 0o644); // Restore permissions for cleanup
        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      });

      // Trigger a write with no callback
      dirty.set('testKey', { value: 'test' });
    });
  });
});