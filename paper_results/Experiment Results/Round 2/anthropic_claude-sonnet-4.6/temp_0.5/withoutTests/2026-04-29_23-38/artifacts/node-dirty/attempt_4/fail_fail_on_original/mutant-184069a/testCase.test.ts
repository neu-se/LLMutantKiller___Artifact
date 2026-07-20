import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit load with 0 for ENOENT but emit error for other filesystem errors', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'testdb');
    // Create a directory at dbPath - reading a directory as a file causes EISDIR (not ENOENT)
    fs.mkdirSync(dbPath);

    // Prevent unhandled error from crashing - we'll handle it ourselves
    const uncaughtHandler = (err: Error) => {
      // If original code emits error but no listener catches it in time,
      // we see it here - this means original code is working correctly
      // (emitting error for non-ENOENT), so the test should pass
      fs.rmSync(tmpDir, { recursive: true, force: true });
      process.removeListener('uncaughtException', uncaughtHandler);
      // Original code correctly threw/emitted error for EISDIR - test passes
      done();
    };

    process.on('uncaughtException', uncaughtHandler);

    const db = new (Dirty as any)(dbPath);

    db.on('error', (err: Error) => {
      // Original code: emits error for non-ENOENT
      process.removeListener('uncaughtException', uncaughtHandler);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
    });

    db.on('load', (count: number) => {
      // Mutated code: emits load(0) for ALL errors including EISDIR
      process.removeListener('uncaughtException', uncaughtHandler);
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(new Error(`Mutation detected: load(${count}) emitted for EISDIR error instead of error event`));
    });
  });
});