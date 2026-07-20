import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should create write stream with utf-8 encoding', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const originalCreateWriteStream = fs.createWriteStream.bind(fs);
    let capturedOptions: any = null;
    
    const spy = jest.spyOn(fs, 'createWriteStream').mockImplementation((filePath: any, options?: any) => {
      if (options?.flags === 'a') {
        capturedOptions = { ...options };
      }
      return originalCreateWriteStream(filePath, options);
    });
    
    new Dirty(dbPath);
    
    spy.mockRestore();
    
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
    
    expect(capturedOptions).not.toBeNull();
    expect(capturedOptions.encoding).toBe('utf-8');
  });
});