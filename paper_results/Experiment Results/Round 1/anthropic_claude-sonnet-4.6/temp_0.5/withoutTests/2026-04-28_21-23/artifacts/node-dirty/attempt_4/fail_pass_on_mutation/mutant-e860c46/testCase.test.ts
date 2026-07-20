import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty close() with in-flight writes', () => {
  it('should emit drain event before closing when there are in-flight writes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);
    let drainEmitted = false;
    let writeCbCalled = false;

    db.on('load', () => {
      // Set a value with a callback - callback fires when write completes
      db.set('key1', { value: 'test' }, () => {
        writeCbCalled = true;
      });

      // Call close() synchronously after set().
      // At this point _flush() has run: _queue is empty, _inFlightWrites === 1.
      // Original: sees _inFlightWrites > 0, registers once('drain', close) and returns.
      // Mutated: ignores _inFlightWrites, calls _writeStream.end() immediately.
      db.close();

      db.once('write_close', () => {
        try {
          // With original code: drain fires first (from write callback), then close() is called again,
          // then write_close fires. writeCbCalled should be true.
          // With mutated code: write stream ends immediately, write callback may not fire.
          expect(writeCbCalled).toBe(true);
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