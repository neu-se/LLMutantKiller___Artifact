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
      // Create pending writes by setting multiple values
      dirty.set('key1', { value: 'value1' }, () => {});
      dirty.set('key2', { value: 'value2' }, () => {});
      dirty.set('key3', { value: 'value3' }, () => {});

      // Track the state before closing
      const hadPendingWrites = dirty._queue.size > 0 || dirty._inFlightWrites > 0;

      // Try to close
      dirty.close();

      // In original code, if there were pending writes, close() should wait for drain
      // In mutated code, it will close immediately regardless
      setImmediate(() => {
        if (hadPendingWrites && dirty._writeStream === null) {
          done(new Error('Closed immediately despite having pending writes'));
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