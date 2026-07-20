import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should return early at second guard when _waitForDrain becomes true', (done) => {
    const db = new (Dirty as any)();

    db.on('load', () => {
      let writeCount = 0;

      // Replace _writeStream with a mock
      (db as any)._writeStream = {
        write: (_data: any, cb: (err: null) => void) => {
          writeCount++;
          setImmediate(() => cb(null));
          return true;
        },
        uncork: () => {},
        cork: () => {},
      };

      // Populate queue
      (db as any)._data.set('key', 'val');
      (db as any)._queue.set('key', []);

      // Make _waitForDrain return false on 1st read (guard 1 passes), true on 2nd (guard 2 fires)
      let reads = 0;
      Object.defineProperty(db, '_waitForDrain', {
        get() { return reads++ >= 1; },
        set() {},
        configurable: true,
      });

      (db as any)._flush();

      // Original: guard 2 reads true → returns early → writeCount=0
      // Mutated:  guard 2 is `if(false)` → loop runs → writeCount=1
      expect(writeCount).toBe(0);
      done();
    });
  });
});