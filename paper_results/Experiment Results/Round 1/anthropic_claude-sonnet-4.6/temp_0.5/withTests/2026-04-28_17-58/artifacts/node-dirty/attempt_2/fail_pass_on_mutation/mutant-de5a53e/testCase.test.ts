import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('close() destroys write stream after end', () => {
  it('should emit write_close event after close() ensuring stream is destroyed', (done) => {
    const file = path.join(os.tmpdir(), `dirty-destroy-test-${process.pid}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('testKey', 'testVal');
      db.on('drain', () => {
        db.close();
      });
    });

    const timeout = setTimeout(() => {
      try { fs.unlinkSync(file); } catch(e) {}
      done(new Error('write_close event was never emitted - stream was not destroyed'));
    }, 2000);

    db.on('write_close', () => {
      clearTimeout(timeout);
      try { fs.unlinkSync(file); } catch(e) {}
      done();
    });
  });
});