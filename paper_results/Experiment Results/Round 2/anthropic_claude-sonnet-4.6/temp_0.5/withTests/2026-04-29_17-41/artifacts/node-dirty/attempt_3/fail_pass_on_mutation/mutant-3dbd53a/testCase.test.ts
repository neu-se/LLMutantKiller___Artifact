import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty persistence', () => {
  it('should persist and reload data correctly', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-persist-test-${Date.now()}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db1 = new Dirty(file);
    db1.on('load', () => {
      db1.set('name', 'félix');
      db1.on('drain', () => {
        db1.close();
        db1.on('write_close', () => {
          const db2 = new Dirty(file);
          db2.on('load', (length: number) => {
            try { fs.unlinkSync(file); } catch (_) {}
            expect(length).toBe(1);
            expect(db2.get('name')).toBe('félix');
            done();
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