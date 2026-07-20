import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should correctly reload data written to disk', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-reload-${process.pid}.dirty`);
    
    try { fs.unlinkSync(file); } catch (_) {}
    
    const db1 = new Dirty(file);
    db1.on('load', () => {
      db1.set('key1', 'value1');
      db1.set('key2', 'value2');
      db1.on('drain', () => {
        db1.close();
        db1.on('write_close', () => {
          const db2 = new Dirty(file);
          db2.on('load', (length: number) => {
            try {
              expect(length).toBe(2);
              expect(db2.get('key1')).toBe('value1');
              expect(db2.get('key2')).toBe('value2');
              try { fs.unlinkSync(file); } catch (_) {}
              done();
            } catch (e) {
              try { fs.unlinkSync(file); } catch (_) {}
              done(e);
            }
          });
          db2.on('error', (err: Error) => {
            try { fs.unlinkSync(file); } catch (_) {}
            done(err);
          });
        });
      });
    });
  });
});