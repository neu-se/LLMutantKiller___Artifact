import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { rimrafSync } from 'rimraf';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event emitted when write stream drains with inFlightWrites === 0', () => {
  it('should emit drain after write stream drain when inFlightWrites is exactly zero', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-mutation-test-'));
    const filePath = path.join(tmpDir, 'test.dirty');

    const db = new Dirty(filePath);

    const cleanup = () => {
      try { rimrafSync(tmpDir); } catch (_) {}
    };

    const timeoutHandle = setTimeout(() => {
      cleanup();
      done(new Error('Timed out: drain event was never emitted'));
    }, 10000);

    db.on('load', () => {
      // Write a very large value to force backpressure on the write stream.
      // When _waitForDrain becomes true, the write callback path won't emit 'drain'
      // (because !this._waitForDrain is false). Only the write stream's 'drain'
      // handler can emit 'drain' in that scenario.
      // Original: if (this._inFlightWrites <= 0) => emits drain when _inFlightWrites === 0
      // Mutated:  if (this._inFlightWrites < 0)  => never emits drain (can't go below 0)
      const largeValue = 'x'.repeat(512 * 1024); // 512KB to force backpressure

      db.on('drain', () => {
        clearTimeout(timeoutHandle);
        cleanup();
        done();
      });

      db.set('largekey', largeValue);
    });
  });
});