import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('drain event emitted after backpressure resolves', () => {
  it('should emit drain after backpressure clears even when write callbacks fired first', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-bp-drain-'));
    const file = path.join(tmpDir, 'test.dirty');

    // Use a write stream with very small highWaterMark to force backpressure
    // by monkey-patching fs.createWriteStream
    const origCreateWriteStream = fs.createWriteStream;
    (fs as any).createWriteStream = (path: string, opts: any) => {
      if (opts && opts.flags === 'a') {
        // Small highWaterMark forces backpressure
        opts = { ...opts, highWaterMark: 1 };
      }
      return origCreateWriteStream(path, opts);
    };

    const db = new Dirty(file);
    (fs as any).createWriteStream = origCreateWriteStream;

    db.on('load', () => {
      const timeout = setTimeout(() => {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(new Error('timed out - drain never fired'));
      }, 5000);

      db.once('drain', () => {
        clearTimeout(timeout);
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done();
      });

      // With tiny highWaterMark, even a small write causes backpressure
      // Write callbacks will fire, decrement _inFlightWrites to 0, but
      // can't emit drain because _waitForDrain=true
      // When stream drain fires: queue empty, _inFlightWrites=0
      // Original: emits drain ✓
      // Mutated: condition (>0) is false, no drain emitted ✗
      db.set('key', 'value');
    });
  });
});