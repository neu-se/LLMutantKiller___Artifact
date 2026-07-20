import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('Dirty error event on read stream error', () => {
  it('should emit "error" event (not empty string) when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = os.tmpdir();
    const dirPath = path.join(tmpDir, `dirty-dir-${Date.now()}`);
    fs.mkdirSync(dirPath);

    const DirtyModule = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const Dirty = DirtyModule.Dirty || DirtyModule;

    const emittedEvents: Array<{event: string, args: any[]}> = [];

    // Patch prototype emit BEFORE constructing so we capture events during _load()
    const originalEmit = Dirty.prototype.emit;
    Dirty.prototype.emit = function(event: string, ...args: any[]) {
      emittedEvents.push({ event, args });
      // For 'error' events with no listener, we need to swallow to avoid crash
      // Check if there's a listener before calling super
      if (event === 'error' && this.listenerCount('error') === 0) {
        // swallow - we've recorded it
        return false;
      }
      if (event === '' && this.listenerCount('') === 0) {
        // swallow mutated event too
        return false;
      }
      return originalEmit.call(this, event, ...args);
    };

    let db: any;
    try {
      db = new Dirty(dirPath);
    } finally {
      Dirty.prototype.emit = originalEmit;
    }

    // Add listeners to prevent future uncaught exceptions
    db.on('error', () => {});
    db.on('', () => {});

    setTimeout(() => {
      try {
        fs.rmdirSync(dirPath);
      } catch (e) {}

      const errorEvents = emittedEvents.filter(e => e.event === 'error');
      const emptyEvents = emittedEvents.filter(e => e.event === '');

      // In original code: 'error' should be emitted for EISDIR
      // In mutated code: '' should be emitted instead
      expect(errorEvents.length).toBeGreaterThan(0);
      expect(emptyEvents.length).toBe(0);
      done();
    }, 500);
  });
});