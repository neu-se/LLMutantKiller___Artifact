import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream drain handling', () => {
  it('should call all set callbacks even when write stream backpressure occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    const db = new Dirty(dbPath);

    const timeout = setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
      done(new Error('Test timed out - callbacks were never fired, likely because _waitForDrain was never reset after write stream drain'));
    }, 15000);

    db.on('load', () => {
      // Write enough large entries to trigger backpressure on the write stream
      // so that _writeStream.write() returns false at some point
      const numEntries = 3000;
      const largeValue = 'x'.repeat(2000);
      let completedCallbacks = 0;

      const onCallback = (err: unknown) => {
        if (err) {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
          done(new Error(`Unexpected error: ${err}`));
          return;
        }
        completedCallbacks++;
        if (completedCallbacks === numEntries) {
          clearTimeout(timeout);
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
          done();
        }
      };

      for (let i = 0; i < numEntries; i++) {
        db.set(`key${i}`, { value: largeValue, index: i }, onCallback);
      }
    });
  }, 20000);
});