import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should emit drain event after all writes complete even when close is called', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-drain-test-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Use a no-path db to control timing precisely
      // Actually let's use a different approach:
      // Intercept _flush to call close() at exactly the right moment
      
      // We need _queue.size=0 but _inFlightWrites>0 when close() is called
      // This happens INSIDE _flush() after write() is called but before callback fires
      // We can achieve this by patching _flush
      
      const originalFlush = (db as any)._flush.bind(db);
      let closeCalled = false;
      
      (db as any)._flush = function() {
        originalFlush();
        // After flush: queue is empty, _inFlightWrites > 0
        if (!closeCalled && (db as any)._inFlightWrites > 0 && (db as any)._queue.size === 0) {
          closeCalled = true;
          // Call close() at exactly the right moment
          db.close();
        }
      };

      let drainFired = false;
      db.on('drain', () => { drainFired = true; });

      db.set('testKey', 'testVal', (_err: unknown) => {
        // Write callback fired
        // In original: drain fires after this, triggering close() again properly
        // In mutated: stream already ended, drain may or may not fire
      });

      db.once('write_close', () => {
        try { fs.unlinkSync(dbPath); } catch (_e) {}
        // After write_close, check the file has the data
        // In original: write completed before stream closed
        // In mutated: stream may have been closed before write completed
        const data = (() => {
          try { return fs.readFileSync(dbPath.replace('.db', '') + '.db', 'utf-8'); } catch (_e) { return ''; }
        })();
        try {
          // The key should be in the file - if mutated closes too early, it might not be
          // Actually let's check drain was fired
          expect(drainFired).toBe(true);
          done();
        } catch (e) {
          done(e as Error);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  }, 10000);
});