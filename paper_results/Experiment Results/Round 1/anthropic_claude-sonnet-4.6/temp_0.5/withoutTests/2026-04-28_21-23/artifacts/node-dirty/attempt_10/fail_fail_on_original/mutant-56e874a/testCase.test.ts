import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should not call uncork when backpressure occurs during flush', (done) => {
    const db = new (Dirty as any)();

    db.on('load', () => {
      let uncorkCount = 0;

      (db as any)._writeStream = {
        write(_d: any, cb: (err: null) => void) {
          setImmediate(() => cb(null));
          return false; // signal backpressure
        },
        uncork() { uncorkCount++; },
        cork() {},
      };

      (db as any)._data.set('k', 'v');
      (db as any)._queue.set('k', []);
      (db as any)._waitForDrain = false;

      (db as any)._flush();

      // Original placeholder inside loop: `if (!_queue.size || _waitForDrain) return;`
      //   After write returns false: _waitForDrain=true, _queue.size=0 → return (no uncork)
      // Mutated: `if (false) return;` → break → uncork called
      expect(uncorkCount).toBe(0);
      done();
    });
  });
});