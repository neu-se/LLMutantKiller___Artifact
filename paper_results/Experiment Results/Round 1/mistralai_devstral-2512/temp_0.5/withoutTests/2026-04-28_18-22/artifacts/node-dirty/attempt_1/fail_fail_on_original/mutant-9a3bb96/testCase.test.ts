import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should wait for pending writes before closing', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      dirty.set('key1', { value: 'test1' }, () => {
        // Immediately try to close while there are pending writes
        dirty.close();

        // The close should be deferred until drain
        dirty.once('drain', () => {
          // After drain, the streams should be properly closed
          expect(dirty._readStream).toBeNull();
          expect(dirty._writeStream).toBeNull();
          fs.unlinkSync(dbPath);
          fs.rmdirSync(testDir);
          done();
        });
      });
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});