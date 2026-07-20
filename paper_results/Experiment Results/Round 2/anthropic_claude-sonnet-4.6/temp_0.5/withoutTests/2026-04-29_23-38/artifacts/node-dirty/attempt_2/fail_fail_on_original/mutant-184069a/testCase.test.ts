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

    const db = new Dirty(dbPath);

    db.on('load', () => {
      // Mutated code reaches here: treats all errors as ENOENT and emits load
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error('load event should not be emitted for non-ENOENT errors (EISDIR) - mutation detected'));
    });

    db.on('error', (err: Error) => {
      // Original code correctly emits error for non-ENOENT errors
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });
  });
});