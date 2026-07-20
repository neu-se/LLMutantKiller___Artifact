import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event (not empty string) for non-ENOENT file read errors', (done) => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-perm-test-${Date.now()}.dirty`);

    // Write a valid file first
    fs.writeFileSync(testFile, '{"key":"foo","val":"bar"}\n', 'utf-8');
    // Make it unreadable to trigger a non-ENOENT error (EACCES)
    fs.chmodSync(testFile, 0o000);

    let errorEventFired = false;
    let emptyEventFired = false;

    const db = new Dirty(testFile);

    // Attach error listener immediately (synchronously after construction)
    // The stream error fires asynchronously so this is safe
    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', (err: Error) => {
      emptyEventFired = true;
    });

    setTimeout(() => {
      // Restore permissions and cleanup
      try { fs.chmodSync(testFile, 0o644); } catch (e) { /* ignore */ }
      try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }

      // Original: emits 'error' -> errorEventFired = true, emptyEventFired = false
      // Mutant: emits '' -> errorEventFired = false, emptyEventFired = true
      expect(errorEventFired).toBe(true);
      expect(emptyEventFired).toBe(false);
      done();
    }, 500);
  });
});