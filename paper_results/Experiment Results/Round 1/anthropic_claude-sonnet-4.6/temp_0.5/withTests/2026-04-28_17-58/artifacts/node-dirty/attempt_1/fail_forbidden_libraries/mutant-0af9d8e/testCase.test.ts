import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event after write stream backpressure', () => {
  it('should emit drain event when write stream drains and queue is empty with no in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(file);

    db.on('load', () => {
      // Write a large number of entries to trigger backpressure on the write stream
      // This forces _waitForDrain to become true, which means when the stream drains
      // with an empty queue and _inFlightWrites <= 0, drain should be emitted.
      const numEntries = 5000;
      let drainFired = false;

      db.on('drain', () => {
        drainFired = true;
        // Clean up
        db.close();
        db.on('write_close', () => {
          rimrafSync(tmpDir);
          done();
        });
      });

      // Write many large values to force backpressure
      const largeValue = 'x'.repeat(1000);
      for (let i = 0; i < numEntries; i++) {
        db.set(`key${i}`, largeValue);
      }

      // Set a timeout to fail if drain never fires
      const timeout = setTimeout(() => {
        rimrafSync(tmpDir);
        done(new Error('drain event was never emitted - mutation likely present'));
      }, 5000);

      // Clear timeout if drain fires
      db.once('drain', () => {
        clearTimeout(timeout);
      });
    });
  });
});