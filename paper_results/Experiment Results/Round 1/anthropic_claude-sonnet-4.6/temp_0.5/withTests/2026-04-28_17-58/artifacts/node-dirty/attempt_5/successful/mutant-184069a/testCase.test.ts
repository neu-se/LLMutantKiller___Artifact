import * as path from 'path';
import * as os from 'os';
import { EventEmitter } from 'events';

describe('dirty non-ENOENT error handling', () => {
  it('should emit error event (not load) when read stream fails with non-ENOENT error', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty_mock_${Date.now()}_${process.pid}.dirty`);
    const fsModule = require('fs');
    const dirtyModulePath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};

    // Save original
    const originalCreateReadStream = fsModule.createReadStream;
    
    // Override createReadStream to return fake stream once
    let intercepted = false;
    Object.defineProperty(fsModule, 'createReadStream', {
      configurable: true,
      writable: true,
      value: (...args: any[]) => {
        if (!intercepted) {
          intercepted = true;
          return fakeReadStream;
        }
        return originalCreateReadStream.apply(fsModule, args);
      }
    });

    // Reload dirty so it picks up the (same) fs module object
    delete require.cache[dirtyModulePath];
    const Dirty = require(dirtyModulePath);

    // Create db instance - this calls _load() synchronously, which calls fs.createReadStream
    // At this point, the mock is still active, so fakeReadStream is returned
    const db = new Dirty(tmpFile);

    // Restore createReadStream
    Object.defineProperty(fsModule, 'createReadStream', {
      configurable: true,
      writable: true,
      value: originalCreateReadStream
    });

    let finished = false;
    const finish = (err?: Error) => {
      if (finished) return;
      finished = true;
      delete require.cache[dirtyModulePath];
      try { fsModule.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    };

    // Register handlers before emitting error
    db.on('load', () => {
      // Mutated code (if true) emits load for ALL errors - wrong
      finish(new Error('load event must not fire for non-ENOENT errors'));
    });

    db.on('error', () => {
      // Original code correctly propagates non-ENOENT errors as error events
      finish();
    });

    // Emit non-ENOENT error on next tick (after handlers are registered)
    process.nextTick(() => {
      const streamErr: any = new Error('Is a directory');
      streamErr.code = 'EISDIR';
      fakeReadStream.emit('error', streamErr);
    });

    setTimeout(() => finish(new Error('Timed out waiting for error event')), 3000);
  });
});