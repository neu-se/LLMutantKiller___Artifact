import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { Writable } from 'stream';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should call setDefaultEncoding with utf-8 when creating write stream', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    let writeStreamSetDefaultEncodingArg: string | undefined;
    const originalSetDefaultEncoding = Writable.prototype.setDefaultEncoding;
    
    Writable.prototype.setDefaultEncoding = function(encoding: string) {
      // Only capture for write streams (not read streams)
      if (this.writable && !this.readable) {
        writeStreamSetDefaultEncodingArg = encoding;
      }
      return originalSetDefaultEncoding.call(this, encoding);
    };
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      Writable.prototype.setDefaultEncoding = originalSetDefaultEncoding;
      
      expect(writeStreamSetDefaultEncodingArg).toBe('utf-8');
      
      db.close();
      db.once('write_close', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
    
    db.on('error', (err: Error) => {
      Writable.prototype.setDefaultEncoding = originalSetDefaultEncoding;
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  });
});