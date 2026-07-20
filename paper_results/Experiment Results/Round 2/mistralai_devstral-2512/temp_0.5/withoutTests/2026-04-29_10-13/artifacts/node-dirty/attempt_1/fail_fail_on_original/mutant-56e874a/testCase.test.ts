import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty database flush behavior', () => {
  const testDir = path.join(__dirname, 'test-db');
  const dbPath = path.join(testDir, 'test.db');

  beforeEach(() => {
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    rimraf.sync(testDir);
  });

  it('should not write to disk when queue is empty', (done) => {
    const db = new Dirty(dbPath);
    const initialSize = fs.statSync(dbPath).size;

    // Wait for load event
    db.on('load', () => {
      // Set a value but don't provide a callback
      db.set('test-key', { value: 'test' }, () => {
        // Immediately remove it (queue should be empty after this)
        db.rm('test-key');

        // Force a flush attempt
        setImmediate(() => {
          // Check that file size hasn't changed (no writes occurred)
          const finalSize = fs.statSync(dbPath).size;
          expect(finalSize).toBe(initialSize);
          done();
        });
      });
    });
  });
});