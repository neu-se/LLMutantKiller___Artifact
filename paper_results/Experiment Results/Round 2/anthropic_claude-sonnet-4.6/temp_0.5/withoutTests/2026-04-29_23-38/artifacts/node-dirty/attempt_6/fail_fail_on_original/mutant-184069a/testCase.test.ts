import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error (not load) for non-ENOENT filesystem errors like EACCES', (done) => {
    // Skip if running as root (permissions won't work)
    if (process.getuid && process.getuid() === 0) {
      done();
      return;
    }

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');

    // Create a file then make it unreadable - causes EACCES (not ENOENT)
    fs.writeFileSync(dbPath, '');
    fs.chmodSync(dbPath, 0o000);

    const DirtyClass = Dirty as any;

    // Defer _load so we can attach listeners first
    const originalLoad = DirtyClass.prototype._load;
    DirtyClass.prototype._load = function() { /* no-op during construction */ };
    const db = new DirtyClass(dbPath);
    DirtyClass.prototype._load = originalLoad;

    db.on('error', (err: Error) => {
      // Original code: emits error for non-ENOENT (EACCES)
      fs.chmodSync(dbPath, 0o644);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', (count: number) => {
      // Mutated code: emits load(0) for ALL errors
      fs.chmodSync(dbPath, 0o644);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error(`Mutation detected: load(${count}) emitted for EACCES instead of error event`));
    });

    // Now manually call _load with listeners attached
    db._load();
  });
});