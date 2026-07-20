import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database error handling', () => {
  const testDir = path.join(__dirname, 'test-db');
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
      // Force a write error by making the directory read-only
      fs.chmodSync(testDir, 0o444);

      // This should trigger an error since no callbacks are registered
      db.set('test-key', { data: 'test' });

      // Restore permissions for cleanup
      setImmediate(() => fs.chmodSync(testDir, 0o755));

      db.on('error', (err) => {
        expect(err).toBeDefined();
        done();
      });
    });

    db.on('error', (err) => {
      // This handles errors during load
      expect(err).toBeDefined();
      done();
    });
  });
});