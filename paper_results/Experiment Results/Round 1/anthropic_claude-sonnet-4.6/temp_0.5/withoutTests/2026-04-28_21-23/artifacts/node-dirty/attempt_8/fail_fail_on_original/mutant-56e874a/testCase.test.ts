import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('should not call uncork after processing last queue item when using return instead of break', (done) => {
    const db = new (Dirty as any)();

    db.on('load', () => {
      let uncorkCount = 0;

      (db as any)._writeStream = {
        write(_data: any, cb: (err: null) => void) {
          setImmediate(() => cb(null));
          return true;
        },
        uncork() { uncorkCount++; },
        cork() {},
      };

      (db as any)._data.set('key', 'val');
      (db as any)._queue.set('key', []);

      (db as any)._flush();

      // After processing 'key', queue becomes empty.
      // Original placeholder: `if (!this._queue.size || this._waitForDrain) return;`
      //   → queue is empty → returns WITHOUT calling uncork → uncorkCount=0
      // Mutated: `if (false) return;` → never fires → loop ends normally → uncork IS called → uncorkCount=1
      expect(uncorkCount).toBe(0);
      done();
    });
  });
});