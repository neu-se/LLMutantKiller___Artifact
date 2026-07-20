import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty _flush', () => {
  it('detects mutation via _waitForDrain getter behavior', (done) => {
    const db = new (Dirty as any)();
    
    db.on('load', () => {
      let writeCount = 0;
      let reads = 0;
      
      // Use defineProperty on the prototype temporarily
      const proto = Object.getPrototypeOf(db);
      const origDescriptor = Object.getOwnPropertyDescriptor(db, '_waitForDrain');
      
      // Delete the own property first, then define on instance
      delete (db as any)._waitForDrain;
      Object.defineProperty(db, '_waitForDrain', {
        get() { return reads++ >= 1; },
        set() {},
        configurable: true,
      });
      
      (db as any)._writeStream = {
        write(_d: any, cb: any) { writeCount++; cb(null); return true; },
        uncork() {},
        cork() {},
      };
      
      (db as any)._data.set('k', 'v');
      (db as any)._queue.set('k', []);
      
      (db as any)._flush();
      
      expect(writeCount).toBe(0);
      done();
    });
  });
});