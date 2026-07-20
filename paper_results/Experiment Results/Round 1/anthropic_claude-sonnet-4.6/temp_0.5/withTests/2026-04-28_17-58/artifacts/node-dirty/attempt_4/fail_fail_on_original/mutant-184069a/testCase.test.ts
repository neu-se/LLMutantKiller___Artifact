import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { EventEmitter } from 'events';
import * as Module from 'module';

describe('dirty non-ENOENT error handling', () => {
  it('should emit error event (not load) when read stream fails with non-ENOENT error', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty_mock_${Date.now()}_${process.pid}.dirty`);

    // Create a fake read stream that will emit a non-ENOENT error
    const fakeReadStream = new EventEmitter() as any;
    fakeReadStream.destroy = () => {};

    // Create a proxy fs that intercepts createReadStream
    let intercepted = false;
    const fakeFs = new Proxy(fs, {
      get(target, prop) {
        if (prop === 'createReadStream' && !intercepted) {
          intercepted = true;
          return () => fakeReadStream;
        }
        const val = (target as any)[prop];
        return typeof val === 'function' ? val.bind(target) : val;
      }
    });

    // Inject fake fs into module cache
    const fsPath = require.resolve('fs');
    const originalFsExports = require.cache[fsPath]?.exports;
    if (require.cache[fsPath]) {
      require.cache[fsPath]!.exports = fakeFs;
    }

    // Clear dirty from cache so it re-requires fs
    const dirtyPath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    delete require.cache[dirtyPath];

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    // Restore fs cache immediately
    if (require.cache[fsPath] && originalFsExports) {
      require.cache[fsPath]!.exports = originalFsExports;
    }

    let finished = false;
    const finish = (err?: Error) => {
      if (finished) return;
      finished = true;
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    };

    const db = new Dirty(tmpFile);

    // Emit a non-ENOENT error from the fake read stream on next tick
    process.nextTick(() => {
      const streamErr: any = new Error('Is a directory');
      streamErr.code = 'EISDIR';
      fakeReadStream.emit('error', streamErr);
    });

    db.on('load', () => {
      finish(new Error('load event must not fire for non-ENOENT errors'));
    });

    db.on('error', () => {
      finish();
    });

    setTimeout(() => finish(new Error('Timed out waiting for error event')), 3000);
  });
});