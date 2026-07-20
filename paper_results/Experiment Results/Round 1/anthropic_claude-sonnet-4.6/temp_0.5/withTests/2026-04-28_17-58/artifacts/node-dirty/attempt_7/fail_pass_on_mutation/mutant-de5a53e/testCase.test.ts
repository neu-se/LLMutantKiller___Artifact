import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('write_close fires exactly once after close()', () => {
  it('write_close event is emitted exactly once', (done) => {
    const file = path.join(os.tmpdir(), `dirty-once-${process.pid}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    let count = 0;

    db.on('write_close', () => { count++; });

    db.on('load', () => {
      db.set('k', 'v');
      db.on('drain', () => {
        db.close();
        setTimeout(() => {
          try { fs.unlinkSync(file); } catch(e) {}
          expect(count).toBe(1);
          done();
        }, 300);
      });
    });
  });
});