import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty write stream encoding', () => {
  it('should successfully write data and fire drain without errors when using a file path', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-enc-test-${Date.now()}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db = new Dirty(file);
    let errorFired = false;
    
    db.on('error', () => { errorFired = true; });
    
    db.on('load', () => {
      db.set('foo', 'bar');
      db.on('drain', () => {
        try { fs.unlinkSync(file); } catch (_) {}
        expect(errorFired).toBe(false);
        done();
      });
    });
  });
});