import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('close() on transient dirty instance', () => {
  it('should not throw when closing a dirty instance without a file path', (done) => {
    // Create a transient (no-path) dirty instance - _writeStream will be null
    const db = new Dirty();

    db.on('load', () => {
      // In original code: `if (this._writeStream)` is false, so .end() is never called
      // In mutated code: `if (true)` means .end() is called on null, throwing TypeError
      expect(() => {
        db.close();
      }).not.toThrow();
      done();
    });
  });
});