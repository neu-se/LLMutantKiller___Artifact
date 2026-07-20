import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should emit drain before closing when writes are in-flight at close time', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-inflight-test-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const events: string[] = [];

      // After set(), _flush() runs: queue emptied, _inFlightWrites=1
      db.set('foo', 'bar', (_err: unknown) => {
        events.push('write_cb');
      });

      // Listen for drain before calling close
      db.once('drain', () => {
        events.push('drain');
      });

      // close() called: queue empty, _inFlightWrites=1
      // Original: waits for drain (registers once('drain', close)), so drain fires first
      // Mutated: calls _writeStream.end() immediately, stream ends before drain fires
      db.close();

      db.once('write_close', () => {
        try { fs.unlinkSync(dbPath); } catch (_e) {}

        try {
          // In original: drain fires (from write completion), then close re-runs and ends stream
          // So drain event should have been emitted before write_close
          expect(events).toContain('drain');
          done();
        } catch (e) {
          done(e);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  });
});