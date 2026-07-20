import { describe, it, expect } from '@jest/globals';
import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close() with pending writes', () => {
  it('should close the database after drain when close() is called with pending writes', (done) => {
    const tmpFile = path.join(tmpdir(), `dirty-test-${Date.now()}-${process.pid}.dirty`);

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // Set a value to create a pending write
      db.set('key1', 'value1');
      db.set('key2', 'value2');

      // Call close() immediately while writes are in flight
      // In the original code, this registers a 'drain' listener that calls close() again
      // In the mutated code, this registers a 'drain' listener that does nothing
      db.close();
    });

    // If close() works correctly (original), write_close will fire
    // If close() is broken (mutated), write_close will never fire
    db.on('write_close', () => {
      // Clean up
      try {
        fs.unlinkSync(tmpFile);
      } catch (e) { /* ignore */ }
      done();
    });

    // Timeout to catch the mutant case where write_close never fires
    const timeout = setTimeout(() => {
      try {
        fs.unlinkSync(tmpFile);
      } catch (e) { /* ignore */ }
      done(new Error('write_close event was never emitted - close() did not complete after drain'));
    }, 3000);

    db.on('write_close', () => {
      clearTimeout(timeout);
    });
  });
});