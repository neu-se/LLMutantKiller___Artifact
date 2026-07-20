import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close destroys read stream', () => {
  it('should emit read_close event when close is called while read stream is still active', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-close-readstream-${process.pid}.dirty`);

    // Create a large file so the read stream stays open long enough for close() to be called
    const line = JSON.stringify({ key: 'testkey', val: 'x'.repeat(200) }) + '\n';
    fs.writeFileSync(tmpFile, line.repeat(3000));

    const db = new Dirty(tmpFile);

    let readCloseFired = false;

    db.on('read_close', () => {
      readCloseFired = true;
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done();
    });

    // Call close immediately - the read stream should still be active
    // Original code: if (this._readStream) this._readStream.destroy() -> triggers read_close
    // Mutated code: if (false) this._readStream.destroy() -> read_close never fires
    db.close();

    setTimeout(() => {
      if (!readCloseFired) {
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done(new Error('read_close event never fired - _readStream.destroy() was not called'));
      }
    }, 5000);
  }, 10000);
});