import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error (not load) for non-ENOENT filesystem errors', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');
    // Create a directory at dbPath - causes EISDIR when read as file
    fs.mkdirSync(dbPath);

    const DirtyClass = Dirty as any;

    // Patch _load to defer execution so we can attach listeners first
    const originalLoad = DirtyClass.prototype._load;
    DirtyClass.prototype._load = function() { /* no-op during construction */ };

    const db = new DirtyClass(dbPath);

    // Restore _load
    DirtyClass.prototype._load = originalLoad;

    db.on('error', (err: Error) => {
      // Original code: emits error for non-ENOENT (EISDIR)
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', (count: number) => {
      // Mutated code: emits load(0) for ALL errors
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error(`Mutation detected: load(${count}) emitted for EISDIR instead of error event`));
    });

    // Now manually call _load
    db._load();
  });
});