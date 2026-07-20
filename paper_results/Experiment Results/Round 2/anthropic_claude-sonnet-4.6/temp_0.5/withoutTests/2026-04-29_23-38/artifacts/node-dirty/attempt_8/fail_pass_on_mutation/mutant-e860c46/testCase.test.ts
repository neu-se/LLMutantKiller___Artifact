import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should emit drain before write_close when close is called with in-flight writes', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-order-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const events: string[] = [];

      db.on('drain', () => events.push('drain'));

      db.set('foo', 'bar', (_err: unknown) => {
        events.push('write_cb');
      });

      // After set(): _queue.size=0, _inFlightWrites=1
      // Original: registers once('drain', close), so drain fires, THEN close() runs, THEN write_close
      //   => events order: write_cb, drain, write_close
      // Mutated: calls _writeStream.end() immediately
      //   => write_close fires, then write_cb fires, then drain fires
      //   => drain comes AFTER write_close
      db.close();

      db.once('write_close', () => {
        events.push('write_close');
        // Give time for any remaining async events
        setImmediate(() => {
          setImmediate(() => {
            try { fs.unlinkSync(dbPath); } catch (_e) {}
            try {
              // In original: drain appears before write_close
              const drainIdx = events.lastIndexOf('drain');
              const writeCloseIdx = events.indexOf('write_close');
              expect(drainIdx).toBeGreaterThanOrEqual(0);
              expect(drainIdx).toBeLessThan(writeCloseIdx);
              done();
            } catch (e) {
              done(e as Error);
            }
          });
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  }, 10000);
});