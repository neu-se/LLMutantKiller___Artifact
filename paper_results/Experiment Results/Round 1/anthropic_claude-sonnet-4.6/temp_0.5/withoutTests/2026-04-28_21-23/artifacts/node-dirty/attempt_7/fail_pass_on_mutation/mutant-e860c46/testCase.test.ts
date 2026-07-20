import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should emit the drain event when close is called after writes complete', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainCount = 0;

      db.on('drain', () => {
        drainCount++;
      });

      // Write a value with a callback
      // After set(), _flush() runs: _queue emptied, _inFlightWrites=1
      // close() called: 
      //   Original: _inFlightWrites>0 → registers once('drain', close) → returns
      //     write completes → _inFlightWrites=0 → emits 'drain' → close() called again → ends stream
      //   Mutated: ignores _inFlightWrites → calls _writeStream.end() immediately
      //     write completes → _inFlightWrites=0 → !_waitForDrain → emits 'drain'
      // Both seem to emit drain...

      // Different approach: check that write_close only fires AFTER drain
      const order: string[] = [];

      db.once('drain', () => order.push('drain'));
      db.once('write_close', () => {
        order.push('write_close');
        try {
          expect(order[0]).toBe('drain');
          expect(order[1]).toBe('write_close');
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });

      db.set('key1', 'value1');
      // Synchronously call close after set - queue is now empty, _inFlightWrites=1
      db.close();
    });

    db.on('error', (err) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});