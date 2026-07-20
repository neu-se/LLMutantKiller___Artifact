import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty close method', () => {
  it('should emit read_close event when close is called before read stream has naturally closed', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-test-readclose-' + process.pid + '.dirty');

    // Write a large amount of data so the read stream is still open when we call close()
    const rows = Array.from({ length: 100000 }, (_, i) => JSON.stringify({ key: 'k' + i, val: 'v' + i })).join('\n') + '\n';
    fs.writeFileSync(file, rows);

    const db = new Dirty(file);

    // Call close() immediately - read stream should still be open/reading
    // In original: _readStream.destroy() is called, read_close fires
    // In mutated: _readStream is never destroyed, read_close never fires (within timeout)
    let readCloseFired = false;
    db.on('read_close', () => {
      readCloseFired = true;
    });

    // Give a small tick for construction to complete, then close before reading finishes
    setImmediate(() => {
      db.close();

      // In original, read_close should fire quickly after destroy
      // In mutated, it won't fire until natural stream end (much later)
      setTimeout(() => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        expect(readCloseFired).toBe(true);
        done();
      }, 200);
    });
  });
});