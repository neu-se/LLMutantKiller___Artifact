import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream encoding property', () => {
  it('should have encoding property set to utf-8 on the write stream', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-enc-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    
    const db = new Dirty(file);
    db.on('error', done);
    db.on('load', () => {
      const ws = (db as any)._writeStream;
      // fs.WriteStream stores the encoding option as ws.encoding
      expect(ws.encoding).toBe('utf-8');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });
  });
});