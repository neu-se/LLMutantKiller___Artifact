import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should set utf-8 encoding on the write stream', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      // The write stream should have encoding set to 'utf-8'
      // With encoding: "", this.encoding would be null/undefined (falsy check skips assignment)
      expect(writeStream.encoding).toBe('utf-8');
      
      db.close();
      db.once('write_close', () => {
        fs.rmSync(tmpDir, { recursive: true });
        done();
      });
    });
    
    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  });
});