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

      // Track if close actually waits
      let closeCompleted = false;
      const closeTimer = setTimeout(() => {
        closeCompleted = true;
      }, 10);

      // Try to close
      dirty.close();

      // Check immediately
      if (dirty._writeStream === null) {
        clearTimeout(closeTimer);
        done(new Error('Write stream closed immediately despite pending writes'));
      } else {
        // Wait a bit more to confirm it's not closing immediately
        setTimeout(() => {
          clearTimeout(closeTimer);
          if (closeCompleted && dirty._writeStream === null) {
            done(new Error('Write stream closed too quickly'));
          } else {
            done();
          }
        }, 20);
      }
    });

    dirty.on('error', (err: Error) => {
      done(err);
    });
  });
});