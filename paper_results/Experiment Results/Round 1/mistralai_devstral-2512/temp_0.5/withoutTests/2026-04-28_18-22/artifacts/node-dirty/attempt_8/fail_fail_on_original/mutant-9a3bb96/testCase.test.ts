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
      let closeCompleted = false;
      let drainEmitted = false;

      // Add multiple pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        // Try to close while there are pending writes
        dirty.close();
        closeCompleted = true;
      });

      dirty.set('key2', { value: 'test2' });
      dirty.set('key3', { value: 'test3' });

      // Listen for drain event
      dirty.once('drain', () => {
        drainEmitted = true;
      });

      // Check immediately after close is called
      setTimeout(() => {
        // In original code, close should be deferred and drain should be emitted
        expect(closeCompleted).toBe(true);
        expect(drainEmitted).toBe(true);

        // In original code, streams should still be open until drain completes
        // In mutated code, streams will be closed immediately
        if (dirty._writeStream === null) {
          // This is the mutated behavior - fail the test
          expect(dirty._readStream).not.toBeNull();
        } else {
          // Original behavior - streams still open
          expect(dirty._readStream).not.toBeNull();
          expect(dirty._writeStream).not.toBeNull();

          // Now wait for actual drain to complete
          dirty.once('drain', () => {
            expect(dirty._readStream).toBeNull();
            expect(dirty._writeStream).toBeNull();
            fs.unlinkSync(dbPath);
            fs.rmdirSync(testDir);
            done();
          });
        }
      }, 100);
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});