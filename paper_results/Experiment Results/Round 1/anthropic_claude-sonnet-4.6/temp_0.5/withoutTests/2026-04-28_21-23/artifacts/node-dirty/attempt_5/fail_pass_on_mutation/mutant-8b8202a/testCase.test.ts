import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should not emit drain while there are still queued writes pending', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainEmittedWithQueuedItems = false;

      // Monkey-patch _flush to intercept and check queue state when drain fires
      db.on('drain', () => {
        // In mutated code: drain fires inside the else branch where _queue.size > 0
        // We can detect this by checking if there are still unwritten callbacks
        if ((db as any)._queue.size > 0) {
          drainEmittedWithQueuedItems = true;
        }
      });

      const total = 150;
      let callbackCount = 0;

      for (let i = 0; i < total; i++) {
        db.set(`key${i}`, { data: 'x'.repeat(3000), index: i }, () => {
          callbackCount++;
          if (callbackCount === total) {
            setTimeout(() => {
              try {
                // Original: drain only fires when _inFlightWrites <= 0, 
                //   which means queue has been fully flushed already
                // Mutated: drain fires even when queue still has items
                expect(drainEmittedWithQueuedItems).toBe(false);
                db.close();
                db.on('write_close', () => {
                  try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
                  done();
                });
              } catch (e) {
                try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
                done(e);
              }
            }, 100);
          }
        });
      }
    });

    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  }, 15000);
});