import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error handling for non-ENOENT errors', () => {
  it('should not emit load event when error is not ENOENT (e.g. EACCES)', (done) => {
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

    // Attach error handler IMMEDIATELY and synchronously after construction
    db.on('error', (err: NodeJS.ErrnoException) => {
      // Restore permissions for cleanup
      try { fs.chmodSync(filePath, 0o644); } catch (_) {}
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}

      expect(err.code).not.toBe('ENOENT');
      expect(loadEmitted).toBe(false);
      done();
    });

    db.on('load', () => {
      loadEmitted = true;
    });
  });
});