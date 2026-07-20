import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('close() mutation test', () => {
  it('should wait for drain when queue has items but no in-flight writes', (done) => {
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-mutant-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);

    db.on('load', () => {
      // Manually put something in the queue without triggering flush
      // by bypassing _flush (set _waitForDrain = true first, then set, then reset)
      db._waitForDrain = true;
      db.set('key1', 'value1'); // goes to queue but _flush returns early
      db._waitForDrain = false;
      // Now: _queue.size === 1, _inFlightWrites === 0
      // Original: 1 || false = true → waits for drain
      // Mutated: 1 && false = false → doesn't wait, closes immediately
      
      let drainFired = false;
      db.once('drain', () => { drainFired = true; });
      
      db.close();
      
      // After close() in original: it registered drain listener and returned
      // After close() in mutated: it proceeded to close immediately
      // We can check if write_close fires after drain
      db.on('write_close', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        // In original: drain fires first (from the once('drain', close) chain)
        // In mutated: write_close fires without drain
        expect(drainFired).toBe(true);
        done();
      });
    });
  });
});