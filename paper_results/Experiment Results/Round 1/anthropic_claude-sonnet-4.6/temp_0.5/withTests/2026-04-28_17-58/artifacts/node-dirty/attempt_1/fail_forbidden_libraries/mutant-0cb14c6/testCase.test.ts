import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('drain event after write stream drain with inFlightWrites === 0', () => {
  it('should emit drain event when write stream drains and inFlightWrites is exactly 0', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new (Dirty as any)(filePath);

    db.on('load', () => {
      // Write many large values to try to cause backpressure on the write stream
      // This increases the chance that the write stream's 'drain' event is triggered
      // with _inFlightWrites === 0
      const largeValue = 'x'.repeat(64 * 1024); // 64KB value
      
      let drainReceived = false;
      
      db.on('drain', () => {
        drainReceived = true;
        // Clean up
        try {
          rimrafSync(tmpDir);
        } catch (e) { /* ignore */ }
        done();
      });

      // Write a large value - this may cause backpressure
      db.set('bigkey', largeValue);
      
      // Set a timeout to fail if drain never fires
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