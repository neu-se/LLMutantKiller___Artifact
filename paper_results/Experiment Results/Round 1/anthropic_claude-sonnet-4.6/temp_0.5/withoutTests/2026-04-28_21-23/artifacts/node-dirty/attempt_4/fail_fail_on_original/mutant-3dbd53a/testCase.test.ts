import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('write stream should have utf-8 as writableDefaultEncoding', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      // Original sets encoding: 'utf-8', which calls setDefaultEncoding('utf-8')
      // setDefaultEncoding lowercases but preserves 'utf-8' (with hyphen)
      // Mutated uses encoding: "", which doesn't call setDefaultEncoding
      // so defaultEncoding stays at 'utf8' (without hyphen)
      expect(writeStream.writableDefaultEncoding).toBe('utf-8');
      
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