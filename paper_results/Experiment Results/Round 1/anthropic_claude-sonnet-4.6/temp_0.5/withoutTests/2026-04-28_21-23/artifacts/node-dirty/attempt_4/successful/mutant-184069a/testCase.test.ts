import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error handling for non-ENOENT errors', () => {
  it('should not emit load event when read stream error is not ENOENT', (done) => {
    if (process.getuid && process.getuid() === 0) {
      done();
      return;
    }

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const filePath = path.join(tmpDir, 'test.db');
    
    // Create the file so write stream succeeds, but make it unreadable
    fs.writeFileSync(filePath, '{"key":"a","val":1}\n');
    // Make file readable/writable for write stream but not read stream
    // We need write access but not read access - use 0o200 (write only)
    fs.chmodSync(filePath, 0o200);

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(filePath);

    let loadEmitted = false;
    let errorCount = 0;

    db.on('load', () => {
      loadEmitted = true;
    });

    // Handle both read stream and write stream errors
    db.on('error', (err: NodeJS.ErrnoException) => {
      errorCount++;
      if (errorCount === 1) {
        // After first error, give time for any load event
        setTimeout(() => {
          try { fs.chmodSync(filePath, 0o644); } catch (_) {}
          try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
          expect(err.code).not.toBe('ENOENT');
          expect(loadEmitted).toBe(false);
          done();
        }, 100);
      }
    });
  });
});