import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event (not empty string) when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const unreadablePath = path.join(tmpDir, 'unreadable.db');

    // Create a file and make it unreadable to trigger a permission error (not ENOENT)
    fs.writeFileSync(unreadablePath, '{"key":"test","val":"value"}\n', 'utf-8');
    fs.chmodSync(unreadablePath, 0o000);

    const db = new Dirty(unreadablePath);

    // Must attach error listener synchronously right after construction
    // to prevent unhandled error exception
    const receivedEvents: string[] = [];

    db.on('error', (err: Error) => {
      receivedEvents.push('error');
    });

    db.on('', (err: Error) => {
      receivedEvents.push('empty_string');
    });

    setTimeout(() => {
      try { fs.chmodSync(unreadablePath, 0o644); } catch (e) {}
      try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}

      // Original code emits 'error', mutated code emits '' (empty string)
      // So on original: receivedEvents includes 'error', not 'empty_string'
      // On mutated: receivedEvents includes 'empty_string', not 'error'
      expect(receivedEvents).toContain('error');
      expect(receivedEvents).not.toContain('empty_string');
      done();
    }, 500);
  });
});