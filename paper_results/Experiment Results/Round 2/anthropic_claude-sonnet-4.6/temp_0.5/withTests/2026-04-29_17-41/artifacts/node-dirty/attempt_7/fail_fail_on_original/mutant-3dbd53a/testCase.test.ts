import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty write stream encoding option', () => {
  it('should create write stream with utf-8 encoding option', (done) => {
    const file = path.join(os.tmpdir(), `dirty-enc-spy-${Date.now()}.dirty`);
    const dirtyPath = require.resolve('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    // Clear the module cache so dirty.js gets a fresh require of fs
    delete require.cache[dirtyPath];
    
    const originalCreateWriteStream = fs.createWriteStream;
    let capturedEncoding: string | undefined;
    
    // Patch fs before requiring dirty.js
    (fs as any).createWriteStream = function(filePath: any, options: any) {
      if (options && 'encoding' in options) {
        capturedEncoding = options.encoding;
      }
      return originalCreateWriteStream.call(fs, filePath, options);
    };
    
    const Dirty = require(dirtyPath);
    const db = new Dirty(file);
    
    db.on('load', () => {
      (fs as any).createWriteStream = originalCreateWriteStream;
      delete require.cache[dirtyPath];
      try { fs.unlinkSync(file); } catch (_) {}
      expect(capturedEncoding).toBe('utf-8');
      done();
    });
    
    db.on('error', (err: Error) => {
      (fs as any).createWriteStream = originalCreateWriteStream;
      delete require.cache[dirtyPath];
      try { fs.unlinkSync(file); } catch (_) {}
      done(err);
    });
  });
});