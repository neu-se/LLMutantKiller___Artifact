import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should call write callbacks before closing the write stream when writes are in-flight', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-inflight-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      const order: string[] = [];

      db.set('key1', 'val1', (_err: unknown) => {
        order.push('write_cb');
      });

      // At this point: _queue.size === 0 (flushed), _inFlightWrites === 1
      // Original: close() sees _inFlightWrites > 0, waits for drain, then closes
      //   => write_cb fires, then drain fires, then close() re-runs, then write_close fires
      //   => order: ['write_cb', 'write_close']
      // Mutated: close() ignores _inFlightWrites, ends stream immediately
      //   => write_close fires before write_cb
      //   => order: ['write_close', 'write_cb'] or write_cb never fires
      db.close();

      db.once('write_close', () => {
        order.push('write_close');

        // Give time for any pending write_cb to fire
        setImmediate(() => {
          try { fs.unlinkSync(dbPath); } catch (_e) {}
          try {
            const writeCbIndex = order.indexOf('write_cb');
            const writeCloseIndex = order.indexOf('write_close');
            expect(writeCbIndex).toBeGreaterThanOrEqual(0);
            expect(writeCbIndex).toBeLessThan(writeCloseIndex);
            done();
          } catch (e) {
            done(e);
          }
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  });
});