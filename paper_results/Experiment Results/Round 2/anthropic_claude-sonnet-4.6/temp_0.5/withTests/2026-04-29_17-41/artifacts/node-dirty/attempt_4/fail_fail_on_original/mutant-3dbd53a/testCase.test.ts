import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty write stream default encoding', () => {
  it('should have utf-8 as the default encoding on the write stream', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-enc-${Date.now()}.dirty`);
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    const db = new Dirty(file);
    db.on('load', () => {
      // Check the write stream's default encoding
      const encoding = db._writeStream.writableDefaultEncoding;
      try { fs.unlinkSync(file); } catch (_) {}
      expect(encoding).toBe('utf8');
      done();
    });
    db.on('error', done);
  });
});