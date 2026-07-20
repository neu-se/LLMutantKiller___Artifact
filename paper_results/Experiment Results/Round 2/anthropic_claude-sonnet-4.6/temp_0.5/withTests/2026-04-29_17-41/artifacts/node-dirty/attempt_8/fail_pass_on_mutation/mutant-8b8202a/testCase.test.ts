import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty drain event', () => {
  it('write_close should only fire after all set callbacks have been invoked', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-close-test-${process.pid}.dirty`);
    try { fs.unlinkSync(tmpFile); } catch (_) {}

    // Write a pre-existing file with lots of data to slow down the read stream
    // and ensure the write stream is ready when we start
    const db = new Dirty(tmpFile);
    const NUM_KEYS = 100;
    const LARGE_VALUE = 'x'.repeat(16384);
    let callbacksFired = 0;

    db.on('load', () => {
      // Start close immediately - it will wait for drain
      // If drain fires prematurely (mutation), close proceeds early
      // and write_close fires before all callbacks complete
      
      for (let i = 0; i < NUM_KEYS; i++) {
        db.set(`key${i}`, LARGE_VALUE + i, () => {
          callbacksFired++;
        });
      }
      
      // Call close right after setting - it should wait for all writes
      db.close();

      db.on('write_close', () => {
        try {
          // All callbacks must have fired before write_close
          expect(callbacksFired).toBe(NUM_KEYS);
          try { fs.unlinkSync(tmpFile); } catch (_) {}
          done();
        } catch (e) {
          try { fs.unlinkSync(tmpFile); } catch (_) {}
          done(e);
        }
      });
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});