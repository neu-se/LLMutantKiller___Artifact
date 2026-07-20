import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error handling for non-ENOENT errors', () => {
  it('should not emit load event when error is not ENOENT (e.g. EACCES)', (done) => {
    // Skip test if running as root (root can read any file)
    if (process.getuid && process.getuid() === 0) {
      done();
      return;
    }

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'noperm.db');
    fs.writeFileSync(filePath, '{"key":"a","val":1}\n');
    fs.chmodSync(filePath, 0o000);

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(filePath);

    let loadEmitted = false;

    db.on('load', () => {
      loadEmitted = true;
    });

    db.on('error', (err: NodeJS.ErrnoException) => {
      setImmediate(() => {
        try { fs.chmodSync(filePath, 0o644); } catch (_) {}
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

        // The error should be EACCES, not ENOENT
        expect(err.code).not.toBe('ENOENT');
        // In original code, load should NOT be emitted for non-ENOENT errors
        expect(loadEmitted).toBe(false);
        done();
      });
    });
  });
});