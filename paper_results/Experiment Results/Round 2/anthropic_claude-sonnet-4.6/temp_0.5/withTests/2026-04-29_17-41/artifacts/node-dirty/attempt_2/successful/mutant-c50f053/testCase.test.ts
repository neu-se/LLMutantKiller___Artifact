import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty error emission on write failure without callback', () => {
  it('should emit error event when write fails and set was called without a callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(filePath);

    db.on('load', () => {
      // Listen for error before triggering the failure
      db.on('error', (err: Error) => {
        expect(err).toBeTruthy();
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
        done();
      });

      // Destroy the write stream to cause subsequent writes to fail
      db._writeStream.destroy();

      // Call set WITHOUT a callback, so cbs.length === 0
      // Original: emits 'error' when write fails and no callbacks
      // Mutated: never emits 'error' (if false)
      db.set('key', 'value');
    });

    // Timeout cleanup
    setTimeout(() => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (e) { /* ignore */ }
    }, 5000);
  });
});