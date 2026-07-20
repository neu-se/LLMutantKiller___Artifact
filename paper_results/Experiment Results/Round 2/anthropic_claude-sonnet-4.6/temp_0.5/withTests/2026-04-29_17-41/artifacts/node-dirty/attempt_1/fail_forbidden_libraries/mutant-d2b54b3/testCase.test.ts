import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      // Write a large value to trigger backpressure on the write stream
      // by setting a very large value that exceeds the highWaterMark
      const largeValue = 'x'.repeat(1024 * 1024); // 1MB string
      
      let drainReceived = false;
      
      db.set('bigkey', largeValue, (err) => {
        // After the write completes, drain should have been emitted
        if (!drainReceived) {
          // drain should come after or with callback
        }
      });

      db.on('drain', () => {
        drainReceived = true;
        rimrafSync(tmpDir);
        done();
      });
    });

    // Timeout safety
    setTimeout(() => {
      rimrafSync(tmpDir);
      done(new Error('drain event was never emitted'));
    }, 5000);
  });
});