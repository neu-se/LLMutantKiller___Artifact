import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close behavior', () => {
  it('should close streams after drain event when there are pending writes', (done) => {
    const testDir = path.join(__dirname, 'test-db');
    const dbPath = path.join(testDir, 'test.db');

    // Ensure clean state
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const db = new Dirty(dbPath);

    // Wait for initial load
    db.once('load', () => {
      // Add some data to trigger writes
      db.set('key1', { value: 'test1' }, () => {
        db.set('key2', { value: 'test2' }, () => {
          // Force close while there might still be pending writes
          db.close();

          // Verify streams are properly closed
          setImmediate(() => {
            expect(db._readStream).toBeNull();
            expect(db._writeStream).toBeNull();
            done();
          });
        });
      });
    });

    // Clean up
    setImmediate(() => {
      rimraf.sync(testDir);
    });
  });
});