import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('close behavior with write stream', () => {
  it('emits both read_close and write_close after close()', (done) => {
    const file = path.join(os.tmpdir(), `dirty-both-${process.pid}.dirty`);
    // Pre-create file with content to ensure read stream is active during close
    fs.writeFileSync(file, '{"key":"a","val":"b"}\n'.repeat(1000));
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    
    // Close immediately before load completes (read stream still active)
    setTimeout(() => {
      db.close();
    }, 5);

    let gotWriteClose = false;
    let gotReadClose = false;

    db.on('write_close', () => { gotWriteClose = true; });
    db.on('read_close', () => { gotReadClose = true; });

    setTimeout(() => {
      try { fs.unlinkSync(file); } catch(e) {}
      expect(gotWriteClose).toBe(true);
      expect(gotReadClose).toBe(true);
      done();
    }, 500);
  });
});