import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should create write stream with utf-8 encoding', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const originalCreateWriteStream = fs.createWriteStream;
    let capturedOptions: any = null;
    
    jest.spyOn(fs, 'createWriteStream').mockImplementation((path: any, options?: any) => {
      if (options && options.flags === 'a') {
        capturedOptions = options;
      }
      return originalCreateWriteStream(path, options);
    });
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      expect(capturedOptions).not.toBeNull();
      expect(capturedOptions.encoding).toBe('utf-8');
      
      jest.restoreAllMocks();
      db.close();
      db.once('write_close', () => {
        fs.rmSync(tmpDir, { recursive: true });
        done();
      });
    });
    
    db.on('error', (err: Error) => {
      jest.restoreAllMocks();
      fs.rmSync(tmpDir, { recursive: true });
      done(err);
    });
  });
});