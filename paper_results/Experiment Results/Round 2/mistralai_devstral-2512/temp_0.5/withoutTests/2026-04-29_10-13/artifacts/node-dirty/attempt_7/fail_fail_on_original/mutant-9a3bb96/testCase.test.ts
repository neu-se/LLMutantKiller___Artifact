import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should emit drain event before closing when there are pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Create pending writes
      dirty.set('key1', { value: 'value1' }, () => {});
      dirty.set('key2', { value: 'value2' }, () => {});

      let drainEmitted = false;
      dirty.on('drain', () => {
        drainEmitted = true;
      });

      // Close should trigger drain event in original code
      dirty.close();

      // Check after a short delay
      setImmediate(() => {
        if (drainEmitted) {
          done();
        } else {
          // In mutated code, drain won't be emitted because close() returns immediately
          done(new Error('Drain event was not emitted before closing'));
        }
      });
    });

    dirty.on('error', (err: Error) => {
      done(err);
    });
  });
});