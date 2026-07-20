import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should pass utf-8 as encoding option to createWriteStream', () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    const original = fs.createWriteStream;
    let capturedEncoding: string | undefined;
    
    Object.defineProperty(fs, 'createWriteStream', {
      configurable: true,
      writable: true,
      value: function(path: any, options?: any) {
        if (options?.flags === 'a') {
          capturedEncoding = options.encoding;
        }
        return original.call(fs, path, options);
      }
    });
    
    new Dirty(dbPath);
    
    Object.defineProperty(fs, 'createWriteStream', {
      configurable: true,
      writable: true,
      value: original
    });
    
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
    
    expect(capturedEncoding).toBe('utf-8');
  });
});