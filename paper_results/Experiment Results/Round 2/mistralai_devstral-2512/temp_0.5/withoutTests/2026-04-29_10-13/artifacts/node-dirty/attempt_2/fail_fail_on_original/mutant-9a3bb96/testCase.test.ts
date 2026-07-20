import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('Dirty close behavior', () => {
  it('should emit drain event when closing with pending writes', (done) => {
    const testDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(testDir, 'test.db');
    const dirty = new Dirty(dbPath);

    dirty.on('load', () => {
      // Set a value with callback to create pending write
      dirty.set('testKey', { value: 'testValue' }, (err) => {
        if (err) {
          done(err);
          return;
        }

        // Track if drain event is emitted
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
            done(new Error('Drain event not emitted when closing with pending writes'));
          }
        });
      });
    });

    dirty.on('error', (err) => {
      done(err);
    });
  });
});