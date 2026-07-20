import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error event on read stream error', () => {
  it('should emit "error" event (not empty string event) when a non-ENOENT read stream error occurs', (done) => {
    // Create a temp file that we can make unreadable
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-test-${Date.now()}.db`);

    // Write some content to the file first
    fs.writeFileSync(dbPath, '{"key":"test","val":"value"}\n', 'utf-8');

    // Make the file unreadable to trigger a non-ENOENT error
    fs.chmodSync(dbPath, 0o000);

    // Check if we're running as root (root can read any file)
    let isRoot = false;
    try {
      fs.readFileSync(dbPath);
      isRoot = true;
    } catch (e) {
      isRoot = false;
    }

    if (isRoot) {
      // Can't test permission errors as root, skip by restoring and using different approach
      fs.chmodSync(dbPath, 0o644);
      fs.unlinkSync(dbPath);
      done();
      return;
    }

    const db = new Dirty(dbPath);

    let errorEventFired = false;
    let emptyStringEventFired = false;

    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', (err: Error) => {
      emptyStringEventFired = true;
    });

    setTimeout(() => {
      // Restore permissions for cleanup
      try {
        fs.chmodSync(dbPath, 0o644);
        fs.unlinkSync(dbPath);
      } catch (e) {
        // ignore cleanup errors
      }

      // In original code: 'error' event should fire, '' event should not
      // In mutated code: '' event fires instead of 'error'
      expect(errorEventFired).toBe(true);
      expect(emptyStringEventFired).toBe(false);
      done();
    }, 500);
  });
});