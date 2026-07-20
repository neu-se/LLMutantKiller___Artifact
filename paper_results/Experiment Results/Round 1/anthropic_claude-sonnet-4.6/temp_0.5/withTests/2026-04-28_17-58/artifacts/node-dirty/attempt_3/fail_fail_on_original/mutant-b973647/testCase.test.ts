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

    let errorFired = false;

    // We need to intercept the error before EventEmitter throws it.
    // Use process.on('uncaughtException') won't work well in Jest.
    // Instead, subclass or wrap - but simplest: attach listener before constructor returns
    // by hooking into EventEmitter prototype temporarily.
    const EventEmitter = require('events').EventEmitter;
    const originalEmit = EventEmitter.prototype.emit;

    let capturedEvent: string | null = null;

    EventEmitter.prototype.emit = function(event: string, ...args: any[]) {
      // Only intercept for our db instance
      if (this === db && typeof event === 'string' && args[0] instanceof Error && args[0].code === 'EISDIR') {
        capturedEvent = event;
        // Call original only if it's 'error' and there's a listener, else swallow
        if (event === 'error') {
          errorFired = true;
          // Don't call original to avoid unhandled error throw - just record it
          return false;
        }
        return false;
      }
      return originalEmit.apply(this, [event, ...args]);
    };

    const db = new Dirty(dirPath);

    setTimeout(() => {
      EventEmitter.prototype.emit = originalEmit;
      try { fs.rmdirSync(dirPath); } catch (e) { /* ignore */ }

      // Original code emits 'error', mutated code emits ''
      expect(capturedEvent).toBe('error');
      done();
    }, 500);
  });
});