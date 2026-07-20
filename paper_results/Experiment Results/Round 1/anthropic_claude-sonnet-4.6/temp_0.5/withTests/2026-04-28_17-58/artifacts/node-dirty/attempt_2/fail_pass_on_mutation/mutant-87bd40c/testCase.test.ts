import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty close method', () => {
  it('should emit read_close event when close is called after load while read stream is still open', (done) => {
    const file = path.join(os.tmpdir(), 'dirty-test-readclose-' + process.pid + '.dirty');

    const rows = Array.from({ length: 500 }, (_, i) => JSON.stringify({ key: 'k' + i, val: 'v' + i })).join('\n') + '\n';
    fs.writeFileSync(file, rows);

    const db = new Dirty(file);

    db.on('load', () => {
      db.on('read_close', () => {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      });
      db.close();
    });
  });
});