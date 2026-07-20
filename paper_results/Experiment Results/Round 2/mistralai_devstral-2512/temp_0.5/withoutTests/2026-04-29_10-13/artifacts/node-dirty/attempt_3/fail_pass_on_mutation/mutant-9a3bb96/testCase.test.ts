import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should not close immediately when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Set a value to create pending write
      dirty.set('testKey', { value: 'testValue' }, () => {
        // Immediately try to close
        const writeStreamBeforeClose = dirty._writeStream;
        dirty.close();

        // In original code, close() should not immediately set _writeStream to null
        // when there are pending writes (it waits for drain)
        // In mutated code, it will immediately set _writeStream to null
        setImmediate(() => {
          if (dirty._writeStream === null && writeStreamBeforeClose !== null) {
            done(new Error('Write stream was closed immediately despite pending writes'));
          } else {
            done();
          }
        });
      });
    });

    dirty.on('error', (err: Error) => {
      done(err);
    });
  });
});