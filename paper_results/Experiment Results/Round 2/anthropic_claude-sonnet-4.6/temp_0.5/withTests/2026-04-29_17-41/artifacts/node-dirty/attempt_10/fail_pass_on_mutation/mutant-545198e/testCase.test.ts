import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Readable } from 'stream';

describe('dirty db chunk handling', () => {
  it('should correctly buffer data when chunks arrive without newlines', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-${process.pid}-${Date.now()}.dirty`);
    fs.writeFileSync(tmpFile, '', 'utf-8');

    // Create a stream that sends a chunk without newline followed by one with newline
    const mockStream = new Readable({ read() {} });
    (mockStream as any).destroy = jest.fn();

    // Intercept fs.createReadStream via require cache manipulation
    const fsModule = require('fs');
    const origCreateReadStream = fsModule.createReadStream;
    fsModule.createReadStream = jest.fn().mockReturnValueOnce(mockStream);

    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(tmpFile);

    fsModule.createReadStream = origCreateReadStream;

    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (size: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(size).toBe(2);
        expect(db.get('a')).toBe(1);
        expect(db.get('b')).toBe(2);
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(tmpFile); } catch (_) {}
      }
    });

    // Send chunks: first without newline, then with newlines
    setImmediate(() => {
      mockStream.push('{"key":"a"');       // no newline
      mockStream.push(',"val":1}\n');      // completes first record
      mockStream.push('{"key":"b","val":2}\n');
      mockStream.push(null);               // end stream
    });
  });
});