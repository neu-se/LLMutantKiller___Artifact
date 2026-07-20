import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty write stream options', () => {
  it('should create write stream with utf-8 encoding', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-opts-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    
    const originalCreateWriteStream = fs.createWriteStream;
    let capturedOptions: any;
    
    const spy = jest.spyOn(fs, 'createWriteStream').mockImplementation((path: any, options?: any) => {
      capturedOptions = options;
      return originalCreateWriteStream(path, options);
    });
    
    const db = new Dirty(file);
    db.on('error', (err: Error) => {
      spy.mockRestore();
      done(err);
    });
    db.on('load', () => {
      spy.mockRestore();
      expect(capturedOptions.encoding).toBe('utf-8');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });
  });
});