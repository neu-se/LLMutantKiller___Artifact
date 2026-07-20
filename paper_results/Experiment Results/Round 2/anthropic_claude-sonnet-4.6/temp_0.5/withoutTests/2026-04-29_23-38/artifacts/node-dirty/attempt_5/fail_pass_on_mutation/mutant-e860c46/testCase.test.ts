import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close()', () => {
  it('should complete all in-flight writes before closing when close is called after drain', (done) => {
    const dbPath = path.join(os.tmpdir(), `dirty-close-test-${process.pid}.db`);
    try { fs.unlinkSync(dbPath); } catch (_e) {}

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let writeCbCalled = false;

      // Write a value, wait for drain (write complete), then immediately
      // do another write and close - this second write will have
      // _queue.size=0 (flushed) and _inFlightWrites=1 when close() is called
      db.set('key1', 'val1', (_err: unknown) => {
        // First write done, now do second write and immediately close
        db.set('key2', 'val2', (_err2: unknown) => {
          writeCbCalled = true;
        });

        // _flush() has run: queue empty, _inFlightWrites=1
        // Original: close() waits because _inFlightWrites > 0
        // Mutated: close() proceeds immediately, ending stream
        db.close();

        // In mutated code: stream ends before write completes
        // The write callback for key2 may never be called
        // We check by reading the file after write_close
        db.once('write_close', () => {
          setTimeout(() => {
            fs.readFile(dbPath, 'utf-8', (err, data) => {
              try { fs.unlinkSync(dbPath); } catch (_e) {}
              if (err) { done(err); return; }
              try {
                expect(writeCbCalled).toBe(true);
                expect(data).toContain('key2');
                done();
              } catch (e) {
                done(e as Error);
              }
            });
          }, 100);
        });
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(dbPath); } catch (_e) {}
      done(err);
    });
  });
});