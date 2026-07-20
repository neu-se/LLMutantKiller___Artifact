import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('_readStream nullified after load', () => {
  it('should set _readStream to null after the read stream closes', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const file = path.join(tmpDir, 'test.dirty');

    // Write some initial data to the file so a read stream is created and used
    fs.writeFileSync(file, JSON.stringify({ key: 'hello', val: 'world' }) + '\n', 'utf-8');

    const db = new Dirty(file);

    db.on('load', () => {
      // The read stream close event fires after load, so wait for it
      db.on('read_close', () => {
        try {
          expect(db._readStream).toBeNull();
        } finally {
          try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
          try { fs.rmdirSync(tmpDir); } catch (e) { /* ignore */ }
          done();
        }
      });

      // Fallback: if read_close never fires (mutated code), check after a delay
      // We use a timeout to detect the mutation where read_close is never emitted
      setTimeout(() => {
        // If we reach here, read_close was never emitted (mutated code)
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        try { fs.rmdirSync(tmpDir); } catch (e) { /* ignore */ }
        // In mutated code, _readStream is NOT null because the close handler does nothing
        expect(db._readStream).toBeNull();
        done();
      }, 2000);
    });
  }, 10000);
});