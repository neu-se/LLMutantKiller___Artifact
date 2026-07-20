import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty error handling', () => {
  it('should emit error event when write fails and set was called without a callback', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mutation-test-'));
    const dbFile = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(dbFile);

    db.on('load', () => {
      // Intercept the write stream to inject a write error
      const ws = db._writeStream;
      ws.write = function(_data: any, cb: any) {
        if (typeof cb === 'function') {
          process.nextTick(() => cb(new Error('Simulated write error')));
        }
        return true;
      };

      db.on('error', (err: Error) => {
        // Original code emits error when cbs.length === 0 (no callback passed to set)
        // Mutated code does NOT emit error in this case
        expect(err.message).toBe('Simulated write error');
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) { /* ignore */ }
        done();
      });

      // Set WITHOUT a callback so cbs array is empty (length === 0)
      // Original: !cbs.length && err != null => true => emits error
      // Mutant:    cbs.length && err != null => false => does NOT emit error
      db.set('key', 'value');
    });
  });
});