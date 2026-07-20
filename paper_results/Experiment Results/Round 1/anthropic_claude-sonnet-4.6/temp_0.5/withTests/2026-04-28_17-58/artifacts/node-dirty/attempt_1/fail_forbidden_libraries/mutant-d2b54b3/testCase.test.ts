import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event fires after write stream backpressure is relieved with empty queue', () => {
  it('should emit drain event when write stream drains with empty queue and no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      // Write a large value to try to trigger backpressure on the write stream
      // We'll write many large records to force the write stream to signal backpressure
      const largeValue = 'x'.repeat(65536); // 64KB value to trigger backpressure
      
      let drainReceived = false;
      
      // Set up drain listener before writing
      db.on('drain', () => {
        drainReceived = true;
        // Cleanup
        try {
          rimrafSync(tmpDir);
        } catch (e) { /* ignore */ }
        done();
      });

      // Write enough data to potentially trigger backpressure
      // Write multiple large records
      for (let i = 0; i < 20; i++) {
        db.set(`key${i}`, largeValue);
      }

      // Fallback timeout to fail the test if drain never fires
      setTimeout(() => {
        if (!drainReceived) {
          try {
            rimrafSync(tmpDir);
          } catch (e) { /* ignore */ }
          done(new Error('drain event was never emitted'));
        }
      }, 5000);
    });
  });
});