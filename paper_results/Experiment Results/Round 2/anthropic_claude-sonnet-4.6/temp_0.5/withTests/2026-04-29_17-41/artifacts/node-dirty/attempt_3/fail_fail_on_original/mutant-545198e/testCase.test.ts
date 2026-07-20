import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('dirty db', () => {
  it('loads data correctly with small chunk sizes', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-test-${process.pid}.dirty`);
    
    // Write content where chunks will split in the middle of lines
    const content = '{"key":"hello","val":"world"}\n{"key":"foo","val":"bar"}\n';
    fs.writeFileSync(tmpFile, content, 'utf-8');
    
    // Patch createReadStream before requiring Dirty
    const origCreateReadStream = fs.createReadStream;
    const patchedFs = { ...fs };
    
    // Use jest to mock
    const mockCreateReadStream = jest.spyOn(fs, 'createReadStream').mockImplementation(
      (filePath: any, options: any) => origCreateReadStream(filePath, { ...options, highWaterMark: 10 })
    );
    
    // Re-require dirty with patched fs
    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    mockCreateReadStream.mockRestore();
    
    const db = new Dirty(tmpFile);
    
    db.on('load', (size: number) => {
      try {
        expect(size).toBe(2);
        expect(db.get('hello')).toBe('world');
        expect(db.get('foo')).toBe('bar');
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(tmpFile); } catch (_) {}
      }
    });
    
    db.on('error', (err: Error) => {
      try { fs.unlinkSync(tmpFile); } catch (_) {}
      done(err);
    });
  });
});