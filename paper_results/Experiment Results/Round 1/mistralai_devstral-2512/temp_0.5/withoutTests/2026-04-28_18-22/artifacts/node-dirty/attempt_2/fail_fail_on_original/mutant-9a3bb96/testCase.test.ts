import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should defer close when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Add a pending write
      dirty.set('key1', { value: 'test1' }, () => {
        // Try to close while there are pending writes
        dirty.close();

        // In original code, close should be deferred and drain should be emitted
        dirty.once('drain', () => {
          expect(dirty._readStream).toBeNull();
          expect(dirty._writeStream).toBeNull();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });

      // Add another write to ensure there are pending operations
      dirty.set('key2', { value: 'test2' });
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});