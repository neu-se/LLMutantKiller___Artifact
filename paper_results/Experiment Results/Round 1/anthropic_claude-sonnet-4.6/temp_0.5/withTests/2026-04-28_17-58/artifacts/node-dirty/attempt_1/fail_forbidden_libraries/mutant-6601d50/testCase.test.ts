import { describe, it, expect } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should close the database even when called while writes are pending in the queue', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(filePath);

    db.on('load', () => {
      // Set a value to create a pending write in the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Call close immediately - queue should still have pending writes
      // In original: listens for 'drain' event, then calls close() again
      // In mutated: listens for '' event which never fires, so write_close never fires
      db.close();
    });

    db.on('write_close', () => {
      // Clean up
      try {
        rimrafSync(tmpDir);
      } catch (e) {
        // ignore cleanup errors
      }
      done();
    });

    // Set a timeout to fail the test if write_close never fires (mutant behavior)
    const timeout = setTimeout(() => {
      try {
        rimrafSync(tmpDir);
      } catch (e) {
        // ignore cleanup errors
      }
      done(new Error('write_close event never fired - close() did not complete'));
    }, 3000);

    // Clear timeout if done is called successfully
    db.once('write_close', () => {
      clearTimeout(timeout);
    });
  });
});