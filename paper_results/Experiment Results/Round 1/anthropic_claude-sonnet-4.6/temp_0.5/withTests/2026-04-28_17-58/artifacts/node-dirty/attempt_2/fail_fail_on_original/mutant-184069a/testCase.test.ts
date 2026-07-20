import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty non-ENOENT error handling', () => {
  it('should emit error event (not load) when read stream fails with a non-ENOENT error', (done) => {
    // Skip on Windows where chmod semantics differ
    if (process.platform === 'win32') {
      return done();
    }
    // Skip when running as root (chmod has no effect)
    if (typeof process.getuid === 'function' && process.getuid() === 0) {
      return done();
    }

    const tmpFile = path.join(os.tmpdir(), `dirty_perm_${Date.now()}_${process.pid}.dirty`);

    // Create a file and make it unreadable to trigger EACCES (not ENOENT)
    fs.writeFileSync(tmpFile, '{"key":"test","val":"value"}\n', 'utf-8');
    fs.chmodSync(tmpFile, 0o000);

    let finished = false;
    const cleanup = () => {
      try { fs.chmodSync(tmpFile, 0o644); } catch (_) {}
      try { fs.unlinkSync(tmpFile); } catch (_) {}
    };
    const finish = (err?: Error) => {
      if (finished) return;
      finished = true;
      cleanup();
      done(err);
    };

    const db = new Dirty(tmpFile);

    db.on('load', () => {
      // In the mutated code (if true instead of if err.code === 'ENOENT'),
      // ALL errors cause 'load' to be emitted and return early.
      finish(new Error('load event should NOT fire for non-ENOENT (EACCES) errors'));
    });

    db.on('error', (err: Error) => {
      // In the original code, non-ENOENT errors correctly propagate as 'error' events
      const code = (err as NodeJS.ErrnoException).code;
      expect(code).not.toBe('ENOENT');
      finish();
    });

    setTimeout(() => {
      finish(new Error('Timed out: expected error event was not emitted'));
    }, 3000);
  });
});