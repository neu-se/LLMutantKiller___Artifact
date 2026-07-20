import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should properly handle close when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Set multiple values to ensure pending writes
      dirty.set('key1', { value: 'value1' }, () => {});
      dirty.set('key2', { value: 'value2' }, () => {});
      dirty.set('key3', { value: 'value3' }, () => {});

      // Track close events
      let writeCloseEmitted = false;
      dirty.on('write_close', () => {
        writeCloseEmitted = true;
      });

      // Close should wait for pending writes in original code
      dirty.close();

      // Check after a short delay
      setImmediate(() => {
        // In original code, write_close should not be emitted immediately
        // In mutated code, it will be emitted immediately
        if (writeCloseEmitted) {
          done(new Error('Write stream closed immediately despite pending writes'));
        } else {
          done();
        }
      });
    });

    dirty.on('error', (err: Error) => {
      done(err);
    });
  });
});