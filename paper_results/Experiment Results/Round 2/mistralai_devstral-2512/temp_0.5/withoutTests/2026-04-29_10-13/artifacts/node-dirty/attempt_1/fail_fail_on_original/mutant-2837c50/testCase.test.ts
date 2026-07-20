import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

describe('Dirty close behavior', () => {
  it('should close streams after drain event when there are pending writes', (done) => {
    const testDir = path.join(__dirname, 'test-dir');
    const dbPath = path.join(testDir, 'test.db');

    // Ensure clean state
    rimraf.sync(testDir);
    fs.mkdirSync(testDir, { recursive: true });

    const dirty = new Dirty(dbPath);

    // Wait for initial load
    dirty.once('load', () => {
      // Add some data to trigger writes
      dirty.set('key1', { value: 'test1' }, () => {
        dirty.set('key2', { value: 'test2' }, () => {
          // Force close while there might still be pending writes
          dirty.close();

          // Verify streams are properly closed
          setImmediate(() => {
            expect(dirty._readStream).toBeNull();
            expect(dirty._writeStream).toBeNull();
            rimraf.sync(testDir);
            done();
          });
        });
      });
    });

    dirty.once('error', (err) => {
      rimraf.sync(testDir);
      done(err);
    });
  });
});