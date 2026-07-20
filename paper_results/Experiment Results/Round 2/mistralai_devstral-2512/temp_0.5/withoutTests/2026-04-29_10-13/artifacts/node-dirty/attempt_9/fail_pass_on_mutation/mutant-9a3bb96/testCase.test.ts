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
      // Create pending writes
      dirty.set('key1', { value: 'value1' }, () => {});
      dirty.set('key2', { value: 'value2' }, () => {});

      // Track close behavior
      let closeCalled = false;
      const originalClose = dirty.close.bind(dirty);
      dirty.close = function() {
        closeCalled = true;
        return originalClose();
      };

      // Try to close
      dirty.close();

      // In original code, close() should not complete immediately when there are pending writes
      // In mutated code, it will complete immediately
      setImmediate(() => {
        if (closeCalled && dirty._writeStream === null) {
          done(new Error('Close completed immediately despite pending writes'));
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