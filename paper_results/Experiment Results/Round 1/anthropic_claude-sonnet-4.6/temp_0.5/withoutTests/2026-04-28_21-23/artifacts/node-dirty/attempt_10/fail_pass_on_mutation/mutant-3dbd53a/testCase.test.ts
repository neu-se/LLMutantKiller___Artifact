import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should store utf-8 encoding on the write stream', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      const writeStream = (db as any)._writeStream;
      
      // Try every possible location where encoding might be stored
      // Check the stream's own properties
      const allProps: Record<string, any> = {};
      let obj: any = writeStream;
      while (obj && obj !== Object.prototype) {
        for (const key of Object.getOwnPropertyNames(obj)) {
          if (!(key in allProps)) {
            try {
              const val = writeStream[key];
              if (typeof val !== 'function' && val !== null && val !== undefined) {
                allProps[key] = val;
              }
            } catch (_) {}
          }
        }
        obj = Object.getPrototypeOf(obj);
      }
      
      // Check if any property contains 'utf-8' or 'utf8'
      const encodingProps = Object.entries(allProps).filter(([k, v]) => 
        typeof v === 'string' && (v === 'utf-8' || v === 'utf8')
      );
      
      console.log('Encoding-related props:', encodingProps);
      
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