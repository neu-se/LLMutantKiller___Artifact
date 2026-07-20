import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { EventEmitter } from 'events';

describe('Dirty error event on read stream error', () => {
  it('should emit "error" event (not empty string) when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = os.tmpdir();
    const dirPath = path.join(tmpDir, `dirty-dir-${Date.now()}`);
    fs.mkdirSync(dirPath);

    const emittedEvents: string[] = [];
    const originalEmit = EventEmitter.prototype.emit;

    // Patch EventEmitter.prototype.emit BEFORE construction
    EventEmitter.prototype.emit = function(event: string, ...args: any[]) {
      emittedEvents.push(event);
      // Swallow error events with no listeners to prevent uncaught exception
      const listenerCount = originalEmit.call(this, 'newListener') !== undefined
        ? (this.listenerCount ? this.listenerCount(event) : 0)
        : 0;
      if ((event === 'error' || event === '') && this.listenerCount(event) === 0) {
        return false;
      }
      return originalEmit.call(this, event, ...args);
    };

    const DirtyModule = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const Dirty = DirtyModule.Dirty || DirtyModule;

    const db = new Dirty(dirPath);

    // Add listeners for safety
    db.on('error', () => {});
    db.on('', () => {});

    setTimeout(() => {
      // Restore EventEmitter prototype
      EventEmitter.prototype.emit = originalEmit;

      try {
        fs.rmdirSync(dirPath);
      } catch (e) {}

      // In original code: 'error' should be emitted for EISDIR
      // In mutated code: '' should be emitted instead of 'error'
      expect(emittedEvents).toContain('error');
      expect(emittedEvents).not.toContain('');
      done();
    }, 1000);
  }, 10000);
});