import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close waits for in-flight writes before ending write stream', () => {
  it('write_close should only fire after the set callback fires', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-close-test-${process.pid}.dirty`);

    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }

    const db = new Dirty(file);
    let setCallbackFired = false;
    let writeCloseFired = false;

    db.on('load', () => {
      db.set('key', 'value', () => {
        setCallbackFired = true;
        // In mutated code, write stream may already be ended/destroyed here
        // causing write_close to have already fired
        expect(writeCloseFired).toBe(false);
      });

      // After _flush: _queue.size=0, _inFlightWrites=1
      // Original: registers drain listener, returns - write stream NOT ended yet
      // Mutated: calls _writeStream.end() immediately
      db.close();

      db.on('write_close', () => {
        writeCloseFired = true;
        expect(setCallbackFired).toBe(true);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
    });
  });
});