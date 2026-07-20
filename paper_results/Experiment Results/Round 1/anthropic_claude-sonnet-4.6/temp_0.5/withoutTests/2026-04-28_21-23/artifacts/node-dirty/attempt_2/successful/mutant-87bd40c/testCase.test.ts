import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty close', () => {
  it('should destroy read stream synchronously when close is called before load completes', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${Date.now()}.db`);
    // Create a large file so the read stream takes time
    const rows = Array(200000).fill('{"key":"testkey","val":42}').join('\n') + '\n';
    fs.writeFileSync(tmpFile, rows);
    
    const db = new Dirty(tmpFile);
    
    // Call close() synchronously - _readStream is definitely non-null here
    // In original: _readStream.destroy() is called, stream closes quickly
    // In mutated: _readStream is never destroyed, stream keeps reading
    
    let readCloseFired = false;
    let loadFired = false;
    
    db.once('read_close', () => {
      readCloseFired = true;
    });
    
    // In original code: after close(), the read stream is destroyed
    // The read_close event should fire BEFORE the load event completes naturally
    // In mutated code: read stream is not destroyed, it reads the whole file
    
    // We verify by checking that write_close fires (meaning close completed)
    // and that read_close also fired
    db.once('write_close', () => {
      try { fs.unlinkSync(tmpFile); } catch(e) {}
      expect(readCloseFired).toBe(true);
      done();
    });
    
    db.close();
  }, 10000);
});