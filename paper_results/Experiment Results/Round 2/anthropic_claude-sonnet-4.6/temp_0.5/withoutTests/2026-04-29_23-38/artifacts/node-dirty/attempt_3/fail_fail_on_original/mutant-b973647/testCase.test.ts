import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('Dirty error event on read stream error', () => {
  it('should emit "error" event (not empty string) when a non-ENOENT read stream error occurs', (done) => {
    const tmpDir = os.tmpdir();
    const dirPath = path.join(tmpDir, `dirty-dir-${Date.now()}`);
    fs.mkdirSync(dirPath);

    // Import Dirty dynamically so we can patch EventEmitter.emit before construction
    const DirtyModule = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const Dirty = DirtyModule.Dirty || DirtyModule;

    const emittedEvents: string[] = [];

    // Subclass to intercept emit before any listeners are set up
    class TestDirty extends Dirty {
      constructor(p: string) {
        super(p);
      }
      emit(event: string, ...args: any[]) {
        emittedEvents.push(event);
        return super.emit(event, ...args);
      }
    }

    // Must add error listener before construction to avoid uncaught exception
    // We do this by patching the prototype temporarily
    const originalEmit = Dirty.prototype.emit;
    Dirty.prototype.emit = function(event: string, ...args: any[]) {
      emittedEvents.push(event);
      return originalEmit.call(this, event, ...args);
    };

    const db = new Dirty(dirPath);

    // Restore prototype
    Dirty.prototype.emit = originalEmit;

    // Add listeners to prevent uncaught exceptions for both original and mutated code
    db.on('error', () => {});
    db.on('', () => {});

    setTimeout(() => {
      try {
        fs.rmdirSync(dirPath);
      } catch (e) {}

      // In original code: 'error' should be in emittedEvents
      // In mutated code: '' should be emitted instead of 'error'
      expect(emittedEvents).toContain('error');
      expect(emittedEvents).not.toContain('');
      done();
    }, 500);
  });
});