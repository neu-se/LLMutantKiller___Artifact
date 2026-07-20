import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { PassThrough } from 'stream';

describe('dirty db', () => {
  it('should correctly load data when stream delivers chunks without newlines', (done) => {
    const file = path.join(os.tmpdir(), `dirty-pt-${process.pid}.dirty`);
    fs.writeFileSync(file, '', 'utf-8');

    // We'll intercept the read stream by replacing the file content
    // with data that will be delivered in specific chunks
    const content = '{"key":"foo","val":"bar"}\n{"key":"baz","val":42}\n';
    fs.writeFileSync(file, content, 'utf-8');

    // Use highWaterMark to force small chunks
    // We need to patch the module's fs usage
    const origReadStream = fs.createReadStream;
    
    // Temporarily replace createReadStream
    Object.defineProperty(fs, 'createReadStream', {
      value: (p: string, opts: any) => origReadStream(p, { ...opts, highWaterMark: 5 }),
      writable: true,
      configurable: true,
    });
    
    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    
    // Restore
    Object.defineProperty(fs, 'createReadStream', {
      value: origReadStream,
      writable: true,
      configurable: true,
    });
    
    const db = new Dirty(file);
    const errors: Error[] = [];
    
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (size: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(size).toBe(2);
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe(42);
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(file); } catch (_) {}
      }
    });
  });
});