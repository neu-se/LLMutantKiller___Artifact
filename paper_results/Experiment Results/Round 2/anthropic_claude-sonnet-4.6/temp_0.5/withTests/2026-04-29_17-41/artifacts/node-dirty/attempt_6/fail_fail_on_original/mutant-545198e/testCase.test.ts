import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import { Readable } from 'stream';

describe('dirty db', () => {
  it('correctly processes data arriving in chunks without newlines', (done) => {
    const tmpFile = path.join(os.tmpdir(), `dirty-${process.pid}.dirty`);
    fs.writeFileSync(tmpFile, '', 'utf-8');
    
    // Create a controlled readable stream
    const chunks = [
      '{"key":"a","val":1}',  // no newline
      '\n{"key":"b","val":2}\n',  // has newlines
    ];
    let idx = 0;
    const readable = new Readable({
      read() {
        if (idx < chunks.length) {
          this.push(chunks[idx++]);
        } else {
          this.push(null);
        }
      }
    });
    (readable as any).destroy = () => {};
    
    // Patch the fs module used by dirty
    const originalCreateReadStream = fs.createReadStream;
    (fs as any).createReadStream = () => readable;
    
    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(tmpFile);
    
    (fs as any).createReadStream = originalCreateReadStream;
    
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
  });
});