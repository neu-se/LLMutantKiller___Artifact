import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should create write stream with utf-8 encoding', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    let capturedEncoding: string | undefined;
    const originalCreateWriteStream = fs.createWriteStream;
    
    try {
      (fs as any).createWriteStream = function(filePath: any, options: any) {
        if (options && options.flags === 'a') {
          capturedEncoding = options.encoding;
        }
        return originalCreateWriteStream.call(this, filePath, options);
      };
    } catch (e) {
      // Can't replace createWriteStream, skip
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done();
      return;
    }
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      try {
        (fs as any).createWriteStream = originalCreateWriteStream;
      } catch (e) {}
      
      expect(capturedEncoding).toBe('utf-8');
      
      db.close();
      db.once('write_close', () => {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        done();
      });
    });
    
    db.on('error', (err: Error) => {
      try {
        (fs as any).createWriteStream = originalCreateWriteStream;
      } catch (e) {}
      fs.rmSync(tmpDir, { recursive: true, force: true });
      done(err);
    });
  });
});