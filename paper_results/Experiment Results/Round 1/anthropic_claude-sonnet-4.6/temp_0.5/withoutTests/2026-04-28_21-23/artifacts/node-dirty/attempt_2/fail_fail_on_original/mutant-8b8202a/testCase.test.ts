import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty drain event', () => {
  it('should only emit drain after all in-flight writes complete when write stream backpressure is relieved', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let callbacksReceived = 0;
      const total = 50;
      let drainFiredBeforeAllCallbacks = false;

      db.on('drain', () => {
        // In mutated code: drain fires even when _inFlightWrites > 0,
        // meaning some write callbacks haven't fired yet
        if (callbacksReceived < total) {
          drainFiredBeforeAllCallbacks = true;
        }
      });

      for (let i = 0; i < total; i++) {
        // Use large values to increase chance of triggering backpressure
        db.set(`key${i}`, { data: 'x'.repeat(1000), index: i }, () => {
          callbacksReceived++;
          if (callbacksReceived === total) {
            // All callbacks fired - now verify drain behavior
            setTimeout(() => {
              try {
                // In original: drain only fires after all in-flight writes complete
                // In mutated: drain may fire before all callbacks, setting this flag
                expect(drainFiredBeforeAllCallbacks).toBe(false);
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