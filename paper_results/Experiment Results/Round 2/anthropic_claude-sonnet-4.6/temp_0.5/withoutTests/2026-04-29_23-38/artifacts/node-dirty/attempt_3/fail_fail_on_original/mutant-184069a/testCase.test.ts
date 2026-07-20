import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error event (not load) when a non-ENOENT filesystem error occurs reading db file', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');
    // Create a directory at dbPath - reading a directory as a file causes EISDIR error (not ENOENT)
    fs.mkdirSync(dbPath);

    // Subclass to attach listeners before _load() runs
    class TestDirty extends (Dirty as any) {
      constructor(p: string) {
        super(p);
      }
    }

    const db = new TestDirty(dbPath);

    // Attach error handler immediately - stream errors are always async so this is safe
    db.on('error', (err: Error) => {
      // Original code correctly emits error for non-ENOENT errors (EISDIR)
      expect((err as NodeJS.ErrnoException).code).not.toBe('ENOENT');
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', () => {
      // Mutated code reaches here: treats all errors as ENOENT and emits load
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error('load event should not be emitted for non-ENOENT errors (EISDIR) - mutation detected'));
    });
  });
});