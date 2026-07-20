import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should emit drain before write_close when close is called with in-flight writes pending', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    db.on('load', () => {
      let drainFired = false;

      db.on('drain', () => {
        drainFired = true;
      });

      // After set(), _flush() runs synchronously:
      // - key is removed from _queue (_queue.size becomes 0)
      // - _inFlightWrites becomes 1
      // - write() is called (async callback pending)
      db.set('key1', 'value1');

      // Now _queue.size === 0, _inFlightWrites === 1
      // Original close(): condition true (_inFlightWrites > 0), waits for drain
      // Mutated close(): condition false, calls _writeStream.end() immediately
      // When _writeStream.end() is called with pending writes, the 'drain' event
      // on the write stream may never fire, so Dirty's 'drain' never fires either.
      db.close();

      // In original: drain fires (from write callback) -> close() called again -> write_close
      // In mutated: write_close fires without drain having fired
      db.once('write_close', () => {
        try {
          expect(drainFired).toBe(true);
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done();
        } catch (err) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
          done(err);
        }
      });
    });

    db.on('error', (err) => {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  }, 10000);
});