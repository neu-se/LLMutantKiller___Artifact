import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = os.tmpdir();
    // Create a directory at the path so opening it as a file causes EISDIR
    const dirPath = path.join(tmpDir, `dirty-dir-test-${Date.now()}`);
    fs.mkdirSync(dirPath);

    const db = new Dirty(dirPath);

    let errorFired = false;

    // Listen for 'error' event to prevent unhandled error exception
    db.on('error', (err: Error) => {
      errorFired = true;
    });

    // Also listen for empty string event (what mutant emits)
    db.on('', (err: Error) => {
      // mutant emits this instead of 'error'
    });

    setTimeout(() => {
      try { fs.rmdirSync(dirPath); } catch (e) { /* ignore */ }

      // Original code emits 'error', so errorFired should be true
      // Mutated code emits '' instead, so errorFired would be false
      expect(errorFired).toBe(true);
      done();
    }, 500);
  });
});