import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close with pending writes', () => {
  it('should eventually close even when there are pending writes in the queue', (done) => {
    const tmpDir = path.join(__dirname, 'tmp_close_test');
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    const file = path.join(tmpDir, `close_test_${Date.now()}.dirty`);

    const db = new Dirty(file);

    db.on('load', () => {
      // Set a value to create a pending write in the queue
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Immediately call close before drain fires
      // In original code: close() sees queue.size > 0, listens for 'drain', then calls close() again
      // In mutated code: close() sees queue.size > 0, listens for '' event which never fires
      db.close();
    });

    db.on('write_close', () => {
      // Clean up
      try {
        fs.unlinkSync(file);
        fs.rmdirSync(tmpDir);
      } catch (e) { /* ignore */ }
      done();
    });

    // Timeout to fail if write_close never fires (mutant case)
    const timeout = setTimeout(() => {
      try {
        fs.unlinkSync(file);
        fs.rmdirSync(tmpDir);
      } catch (e) { /* ignore */ }
      done(new Error('write_close event never fired - close() did not complete'));
    }, 3000);

    // Clear timeout if done is called
    db.on('write_close', () => clearTimeout(timeout));
  });
});