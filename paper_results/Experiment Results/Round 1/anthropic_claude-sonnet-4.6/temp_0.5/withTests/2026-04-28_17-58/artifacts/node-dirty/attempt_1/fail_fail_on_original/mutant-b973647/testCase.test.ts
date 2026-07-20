import { EventEmitter } from 'events';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event (not empty string event) when a non-ENOENT read stream error occurs', (done) => {
    // Create a temporary file path
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    // Write valid content to the file first
    fs.writeFileSync(testFile, '{"key":"foo","val":"bar"}\n', 'utf-8');

    const db = new Dirty(testFile);

    let errorEventFired = false;
    let emptyEventFired = false;

    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', (err: Error) => {
      emptyEventFired = true;
    });

    // Wait for load, then simulate a read stream error by creating a new Dirty
    // instance pointing to a file that will cause a non-ENOENT error.
    // We'll do this by creating a directory at the path (so opening it as a file fails with EISDIR)
    db.on('load', () => {
      // Clean up the test file
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }

      // Create a directory at a new path to trigger EISDIR error
      const dirPath = path.join(tmpDir, `dirty-dir-test-${Date.now()}`);
      try { fs.mkdirSync(dirPath); } catch (e) { /* ignore */ }

      const db2 = new Dirty(dirPath);

      let errorFired = false;
      let emptyStringFired = false;

      db2.on('error', (err: Error) => {
        errorFired = true;
      });

      db2.on('', (err: Error) => {
        emptyStringFired = true;
      });

      // Give time for the error to propagate
      setTimeout(() => {
        try { fs.rmdirSync(dirPath); } catch (e) { /* ignore */ }

        // In original code: 'error' event is emitted
        // In mutated code: '' (empty string) event is emitted
        expect(errorFired).toBe(true);
        expect(emptyStringFired).toBe(false);
        done();
      }, 500);
    });
  });
});