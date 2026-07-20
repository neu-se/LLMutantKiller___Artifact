import { describe, it, expect } from '@jest/globals';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() on transient dirty instance', () => {
  it('should not throw when closing a dirty instance without a file path', (done) => {
    // Create a transient (no-path) dirty instance
    const db = new Dirty();

    db.on('load', () => {
      // Set a value to ensure the db is working
      db.set('key', 'value', () => {
        // In the mutated code, close() will call this._writeStream.end()
        // but this._writeStream is null for transient instances,
        // causing a TypeError. The original code checks `if (this._writeStream)`
        // and safely skips the call.
        expect(() => {
          db.close();
        }).not.toThrow();
        done();
      });
    });
  });
});