import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event after write stream drain', () => {
  it('should emit drain event when inFlightWrites is exactly 0 after write stream drain', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-drain-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath) as any;
    let testDone = false;

    const finish = (err?: Error) => {
      if (testDone) return;
      testDone = true;
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(err);
    };

    db.on('load', () => {
      const ws = db._writeStream as any;
      const origWrite = ws.write.bind(ws);

      // We need:
      // 1. write() returns false → _waitForDrain = true
      // 2. write callback fires (but since _waitForDrain=true, it won't emit drain)
      //    → _inFlightWrites goes to 0
      // 3. stream emits 'drain' → _waitForDrain=false, _inFlightWrites===0
      //    → original: 0 <= 0 → emits drain ✓
      //    → mutated:  0 < 0  → does NOT emit drain ✗
      
      ws.write = (chunk: any, cb: any) => {
        // Intercept: call cb synchronously while _waitForDrain is still true
        // Then return false to set _waitForDrain = true
        // We need cb to fire BEFORE stream drain, but AFTER _waitForDrain is set
        
        // Store cb, return false (backpressure), fire cb after _waitForDrain is set,
        // then fire stream drain after cb
        let savedCb = cb;
        
        // Return false immediately - _flush will set _waitForDrain = true
        // Schedule: first fire the write callback (while _waitForDrain=true),
        // then emit stream drain
        setImmediate(() => {
          // At this point _waitForDrain should be true (set by _flush after write returned false)
          // Fire the write callback - _inFlightWrites goes to 0
          // Since _waitForDrain is true, the callback won't emit drain
          if (savedCb) savedCb(null);
          // Now emit stream drain - _inFlightWrites is 0
          setImmediate(() => ws.emit('drain'));
        });
        
        return false;
      };

      db.once('drain', () => {
        finish();
      });

      db.set('testKey', { hello: 'world' });
    });

    db.on('error', (err: Error) => finish(err));
    setTimeout(() => finish(new Error('Timed out: drain event was never emitted')), 3000);
  });
});