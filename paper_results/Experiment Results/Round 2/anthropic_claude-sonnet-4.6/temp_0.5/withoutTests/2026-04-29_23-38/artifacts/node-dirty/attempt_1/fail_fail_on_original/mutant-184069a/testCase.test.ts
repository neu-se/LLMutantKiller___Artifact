import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimraf } from 'rimraf';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error handling for non-ENOENT read errors', () => {
  it('should emit error event when a non-ENOENT error occurs reading the db file (e.g., EISDIR)', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    // Create a directory with the same name as the db path
    // Trying to read a directory as a file causes EISDIR, not ENOENT
    const dbPath = path.join(tmpDir, 'testdb');
    fs.mkdirSync(dbPath);

    let errorEmitted = false;
    let loadEmitted = false;

    const db = new Dirty(dbPath);

    db.on('error', (err: Error) => {
      errorEmitted = true;
    });

    db.on('load', (count: number) => {
      loadEmitted = true;
      // In original code: error should have been emitted, not load (for EISDIR)
      // In mutated code: load is emitted with 0 even for non-ENOENT errors
      
      // Cleanup
      rimraf(tmpDir).then(() => {
        // The mutated code would reach here (load emitted without error)
        // The original code should NOT emit load for EISDIR - it emits error instead
        // So if we get here, the mutation is present
        done(new Error('Expected error event but got load event for EISDIR error'));
      }).catch(done);
    });

    db.on('error', () => {
      // Original behavior: non-ENOENT errors emit 'error' event
      // We need to wait a bit to ensure load is not also emitted
      setTimeout(() => {
        rimraf(tmpDir).then(() => {
          if (!loadEmitted) {
            done(); // Correct behavior: error emitted, no load
          }
          // If load was also emitted, done() was already called with error above
        }).catch(done);
      }, 200);
    });

    // Timeout safety
    setTimeout(() => {
      if (!errorEmitted && !loadEmitted) {
        rimraf(tmpDir).then(() => {
          done(new Error('Neither error nor load was emitted'));
        }).catch(done);
      }
    }, 2000);
  });
});