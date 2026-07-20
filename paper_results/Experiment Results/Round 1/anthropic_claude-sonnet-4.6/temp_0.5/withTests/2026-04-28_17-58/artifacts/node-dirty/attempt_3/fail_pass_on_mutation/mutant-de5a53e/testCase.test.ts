import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

describe('close() calls destroy on write stream', () => {
  it('should call destroy on the write stream after end completes', (done) => {
    const file = path.join(os.tmpdir(), `dirty-spy-${process.pid}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('k', 'v');
      db.on('drain', () => {
        // Spy on destroy
        const ws = db._writeStream;
        let destroyCalled = false;
        const origDestroy = ws.destroy.bind(ws);
        ws.destroy = (...args) => { destroyCalled = true; return origDestroy(...args); };

        db.close();

        db.on('write_close', () => {
          try { fs.unlinkSync(file); } catch(e) {}
          expect(destroyCalled).toBe(true);
          done();
        });

        setTimeout(() => {
          try { fs.unlinkSync(file); } catch(e) {}
          if (!destroyCalled) done(new Error('destroy was never called on write stream'));
          else done();
        }, 1000);
      });
    });
  });
});