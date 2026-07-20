import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = os.tmpdir();
    const dirPath = path.join(tmpDir, `dirty-dir-test-${Date.now()}`);
    fs.mkdirSync(dirPath);

    let capturedEvent: string | null = null;
    const originalEmit = EventEmitter.prototype.emit;

    // Patch emit before creating instance so we capture the event name
    // before EventEmitter can throw on unhandled 'error'
    EventEmitter.prototype.emit = function(event: string, ...args: any[]) {
      const err = args[0] as NodeJS.ErrnoException;
      if (
        err instanceof Error &&
        (err.code === 'EISDIR' || err.code === 'EBADF') &&
        capturedEvent === null
      ) {
        capturedEvent = event;
        // Restore and don't propagate to avoid unhandled error
        return false;
      }
      return originalEmit.apply(this, [event, ...args] as [string, ...any[]]);
    };

    const db = new Dirty(dirPath);

    setTimeout(() => {
      EventEmitter.prototype.emit = originalEmit;
      try { fs.rmdirSync(dirPath); } catch (e) { /* ignore */ }

      // Original code emits 'error', mutated code emits ''
      expect(capturedEvent).toBe('error');
      done();
    }, 1000);
  });
});