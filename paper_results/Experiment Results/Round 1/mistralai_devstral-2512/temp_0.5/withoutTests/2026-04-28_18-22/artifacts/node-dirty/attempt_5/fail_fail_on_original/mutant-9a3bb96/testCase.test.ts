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
      let closeCalled = false;
      let drainEmitted = false;

      // Add multiple pending writes
      dirty.set('key1', { value: 'test1' }, () => {
        // Try to close while there are pending writes
        dirty.close();
        closeCalled = true;
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
        expect(closeCalled).toBe(true);
        expect(drainEmitted).toBe(true);

        // In mutated code, streams will be closed immediately
        // In original code, streams should still be open until drain
        if (dirty._writeStream !== null) {
          // Original behavior - streams still open
          expect(dirty._readStream).not.toBeNull();
          expect(dirty._writeStream).not.toBeNull();
        } else {
          // Mutated behavior - streams closed immediately
          fail('Streams were closed immediately when they should have been deferred');
        }

        fs.unlinkSync(dbPath);
        fs.rmdirSync(testDir);
        done();
      }, 50);
    });

    dirty.on('error', (err) => {
      fs.unlinkSync(dbPath);
      fs.rmdirSync(testDir);
      done(err);
    });
  });
});