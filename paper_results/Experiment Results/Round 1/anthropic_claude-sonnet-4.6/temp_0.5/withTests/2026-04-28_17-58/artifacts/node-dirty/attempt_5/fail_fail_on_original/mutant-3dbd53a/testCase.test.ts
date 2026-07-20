import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// We need to intercept fs.createWriteStream before dirty.js loads it
// Use Object.defineProperty to make it writable first
describe('dirty write stream options', () => {
  it('should create write stream with utf-8 encoding option', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-enc-${process.pid}.dirty`);
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    
    const originalCreateWriteStream = fs.createWriteStream;
    let capturedEncoding: string | undefined;
    
    Object.defineProperty(fs, 'createWriteStream', {
      configurable: true,
      writable: true,
      value: (p: any, opts?: any) => {
        if (opts) capturedEncoding = opts.encoding;
        return originalCreateWriteStream.call(fs, p, opts);
      }
    });
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(file);
    
    db.on('error', (err: Error) => {
      Object.defineProperty(fs, 'createWriteStream', { configurable: true, writable: true, value: originalCreateWriteStream });
      done(err);
    });
    db.on('load', () => {
      Object.defineProperty(fs, 'createWriteStream', { configurable: true, writable: true, value: originalCreateWriteStream });
      expect(capturedEncoding).toBe('utf-8');
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done();
    });
  });
});