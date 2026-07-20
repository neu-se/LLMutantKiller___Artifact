import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('close() destroys write stream', () => {
  it('write stream has destroyed=true after close() due to explicit destroy call', (done) => {
    const file = path.join(os.tmpdir(), `dirty-destroyed-check-${process.pid}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    let capturedWs: any;

    db.on('load', () => {
      capturedWs = db._writeStream;
      db.set('k', 'v');
      db.on('drain', () => db.close());
    });

    db.on('write_close', () => {
      try { fs.unlinkSync(file); } catch(e) {}
      expect(capturedWs.destroyed).toBe(true);
      done();
    });
  });
});