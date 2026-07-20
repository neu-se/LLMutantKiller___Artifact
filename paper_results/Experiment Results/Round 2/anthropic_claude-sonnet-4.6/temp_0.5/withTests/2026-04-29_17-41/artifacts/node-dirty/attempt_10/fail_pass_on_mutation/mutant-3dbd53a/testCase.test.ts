import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db write encoding', () => {
  it('should write data that reloads correctly after close', (done) => {
    const file = path.join(os.tmpdir(), `dirty-reload-${Date.now()}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

    const db = new Dirty(file);
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.on('write_close', () => {
          const db2 = new Dirty(file);
          db2.on('load', (size: number) => {
            try { fs.unlinkSync(file); } catch (_) {}
            expect(size).toBe(1);
            expect(db2.get('key')).toBe('value');
            done();
          });
          db2.on('error', (err: Error) => {
            try { fs.unlinkSync(file); } catch (_) {}
            done(err);
          });
        });
      });
    });
    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});