import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('close destroys read stream', () => {
  it('should emit read_close event when close is called while read stream is active', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-close-${process.pid}.dirty`);

    // Create a large file to keep the read stream busy
    const line = JSON.stringify({ key: 'k', val: 'v'.repeat(1000) }) + '\n';
    const content = line.repeat(10000);
    fs.writeFileSync(tmpFile, content);

    const db = new Dirty(tmpFile);

    // Pause the read stream immediately so it stays open
    if (db._readStream) {
      db._readStream.pause();
    }

    let readCloseFired = false;

    db.on('read_close', () => {
      readCloseFired = true;
      try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
      done();
    });

    // Now call close - _readStream should still be non-null since we paused it
    // Original: if (this._readStream) this._readStream.destroy() -> read_close fires
    // Mutated:  if (false) ... -> _readStream never destroyed -> read_close never fires
    db.close();

    setTimeout(() => {
      if (!readCloseFired) {
        try { fs.unlinkSync(tmpFile); } catch (e) { /* ignore */ }
        done(new Error('read_close event never fired'));
      }
    }, 5000);
  }, 10000);
});