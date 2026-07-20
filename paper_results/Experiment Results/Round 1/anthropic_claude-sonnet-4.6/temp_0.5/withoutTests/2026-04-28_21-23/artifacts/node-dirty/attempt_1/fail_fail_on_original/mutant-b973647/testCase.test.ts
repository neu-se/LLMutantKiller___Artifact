import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error event emission', () => {
  it('should emit "error" event (not empty string event) when a non-ENOENT read error occurs', (done) => {
    // Create a temp directory and file
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');

    // Write a valid DB file first
    fs.writeFileSync(dbPath, '{"key":"foo","val":"bar"}\n', 'utf-8');

    const db = new Dirty(dbPath);

    const errorEvents: string[] = [];

    // Listen for the generic 'error' event
    db.on('error', (err: Error) => {
      errorEvents.push('error');
    });

    // Also listen for empty string event to detect the mutation
    db.on('', (err: Error) => {
      errorEvents.push('empty_string_error');
    });

    db.on('load', () => {
      // Now we need to trigger a non-ENOENT error on the read stream
      // We'll do this by creating a new Dirty instance with a path that
      // causes a permission error (not ENOENT)
      
      // Create a directory where a file is expected (causes EISDIR error)
      const dirAsFilePath = path.join(tmpDir, 'subdir');
      fs.mkdirSync(dirAsFilePath);
      // Make the directory unreadable to trigger a permission error
      // Actually, let's use a different approach: create a file, then make it unreadable
      const unreadablePath = path.join(tmpDir, 'unreadable.db');
      fs.writeFileSync(unreadablePath, '{"key":"test","val":"value"}\n', 'utf-8');
      fs.chmodSync(unreadablePath, 0o000);

      const db2 = new Dirty(unreadablePath);
      const errorEvents2: string[] = [];

      db2.on('error', (err: Error) => {
        errorEvents2.push('error');
      });

      db2.on('', (err: Error) => {
        errorEvents2.push('empty_string_error');
      });

      db2.on('load', () => {
        // restore permissions for cleanup
        fs.chmodSync(unreadablePath, 0o644);
        fs.rmSync(tmpDir, { recursive: true, force: true });
        
        // This shouldn't happen if there's a permission error
        done();
      });

      // Wait a bit for error to be emitted
      setTimeout(() => {
        // restore permissions for cleanup
        try { fs.chmodSync(unreadablePath, 0o644); } catch (e) {}
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

        // In original code: 'error' event should be emitted
        // In mutated code: '' (empty string) event should be emitted instead
        expect(errorEvents2).toContain('error');
        expect(errorEvents2).not.toContain('empty_string_error');
        done();
      }, 500);
    });
  });
});