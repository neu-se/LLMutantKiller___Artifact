import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty error event emission on read stream error', () => {
  it('should emit "error" event for non-ENOENT read stream errors', (done) => {
    const tmpDir = os.tmpdir();
    const testFile = path.join(tmpDir, `dirty-test-${Date.now()}.dirty`);

    // Write valid content so the file opens successfully
    fs.writeFileSync(testFile, '{"key":"foo","val":"bar"}\n', 'utf-8');

    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(testFile);

    let errorEventFired = false;
    let emptyEventFired = false;

    // Attach listeners synchronously - stream errors fire asynchronously
    db.on('error', (err: Error) => {
      errorEventFired = true;
    });

    db.on('', () => {
      emptyEventFired = true;
    });

    // Wait for load, then manually trigger a non-ENOENT error on the read stream
    // by emitting directly on the internal _readStream if it still exists,
    // or simulate by directly calling the internal error handler
    db.once('load', () => {
      // After load, _readStream may be null. Instead, create a new db and
      // inject error before load completes by emitting on _readStream
    });

    // Create a second db instance and inject error on its _readStream
    const db2 = new Dirty(testFile);
    let error2Fired = false;
    let empty2Fired = false;

    db2.on('error', () => { error2Fired = true; });
    db2.on('', () => { empty2Fired = true; });

    // _readStream is set synchronously in constructor
    setImmediate(() => {
      if (db2._readStream) {
        const err = Object.assign(new Error('EIO error'), { code: 'EIO' });
        db2._readStream.emit('error', err);
      }

      setTimeout(() => {
        try { fs.unlinkSync(testFile); } catch (e) { /* ignore */ }
        // Original: emits 'error' event -> error2Fired = true
        // Mutant: emits '' event -> empty2Fired = true
        expect(error2Fired).toBe(true);
        expect(empty2Fired).toBe(false);
        done();
      }, 300);
    });
  });
});