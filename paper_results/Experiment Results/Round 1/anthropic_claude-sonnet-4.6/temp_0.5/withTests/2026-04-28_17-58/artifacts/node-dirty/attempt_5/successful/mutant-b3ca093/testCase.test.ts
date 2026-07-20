import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty _flush backpressure guard', () => {
  it('should emit drain exactly once when set is called during backpressure', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const file = path.join(os.tmpdir(), `dirty-bp-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) {}
    
    const db = new Dirty(file);
    let drainCount = 0;
    
    db.on('drain', () => drainCount++);
    
    db.on('load', () => {
      const ws = db._writeStream;
      let writeCallCount = 0;
      const pendingCbs: Array<(err: Error | null) => void> = [];
      
      // Mock write: first call returns false (backpressure), second returns true
      ws.write = (data: any, cb: (err: Error | null) => void) => {
        writeCallCount++;
        pendingCbs.push(cb);
        return writeCallCount > 1; // false for first, true for rest
      };
      
      db.set('key1', 'val1');
      // writeCallCount=1, _waitForDrain=true, _inFlightWrites=1
      
      db.set('key2', 'val2');
      // Original: _flush() returned early (waitForDrain=true), queue={key2}
      // Mutation: _flush() proceeded, writeCallCount=2, write returned true, _waitForDrain=false, _inFlightWrites=2
      
      // Fire cb1 (always exists at this point)
      pendingCbs[0](null);
      // Original: _inFlightWrites=0, _waitForDrain=true → no drain
      // Mutation: _inFlightWrites=1, _waitForDrain=false → no drain
      
      // Fire cb2 if it already exists (only in mutation case)
      const cb2 = pendingCbs[1];
      if (cb2) cb2(null);
      // Mutation: _inFlightWrites=0, _waitForDrain=false → drain emitted (drainCount=1)
      
      // Emit stream drain event
      ws.emit('drain');
      // Original: _waitForDrain=false, queue={key2} → _flush() writes key2, _inFlightWrites=1
      // Mutation: _waitForDrain=false, queue empty, _inFlightWrites=0 → drain emitted AGAIN (drainCount=2)
      
      // Fire any new callbacks added by drain handler (only in original)
      if (pendingCbs.length > 1 && pendingCbs[1] !== cb2) {
        pendingCbs[1](null);
        // Original: _inFlightWrites=0, _waitForDrain=false → drain emitted (drainCount=1)
      } else if (pendingCbs.length > 1 && cb2 === undefined) {
        pendingCbs[1](null);
      }
      
      setImmediate(() => {
        expect(drainCount).toBe(1);
        try { fs.unlinkSync(file); } catch (e) {}
        done();
      });
    });
  });
});