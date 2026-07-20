import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty createReadStream encoding', () => {
  it('should correctly read data when a multi-byte character is split across stream chunks', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-chunk-test-${process.pid}.dirty`);

    // Create a row where a multi-byte UTF-8 character lands at a chunk boundary
    // We'll write many rows to force multiple chunks, with multi-byte chars at the end
    // A 3-byte UTF-8 char (e.g., '€' = 0xE2 0x82 0xAC) split across chunks
    // causes corruption in Buffer mode but not in utf-8 string mode
    
    // Use highWaterMark of 16 bytes to force small chunks
    // We'll pad to exactly position a multi-byte char at the boundary
    
    // '€' is 3 bytes in UTF-8. We want it split across a 16-byte chunk boundary.
    // Row format: {"key":"a","val":"€"}\n
    // Let's craft padding so the € straddles a chunk boundary
    
    // Pad with ASCII to fill up to just before the chunk boundary
    // then put the multi-byte char right at the boundary
    
    // Row: {"key":"XXXXXXXX","val":"€"}\n
    // Let's compute: {"key":"","val":"€"}\n = 21 bytes for € (3 bytes) + overhead
    // {"key":"","val":""}\n = 18 bytes base
    // We want total to be e.g. 32 bytes with € straddling byte 16
    
    // Simpler: just write a file with many multi-byte chars and use a tiny highWaterMark
    // The key insight: with encoding:'utf-8', Node's StringDecoder handles split chars
    // With encoding:'', raw Buffers are emitted and buffer += chunk corrupts split chars
    
    const val = '\u20AC\u20AC\u20AC'; // € repeated (each is 3 bytes)
    const row = JSON.stringify({ key: 'k', val }) + '\n';
    
    // Write the file
    fs.writeFileSync(file, row, 'utf-8');
    
    // Monkey-patch createReadStream to use a tiny highWaterMark to force chunk splits
    const origCreateReadStream = fs.createReadStream;
    (fs as any).createReadStream = (p: string, opts: any) => {
      return origCreateReadStream(p, { ...opts, highWaterMark: 8 });
    };
    
    const db = new Dirty(file);
    
    db.on('load', (length: number) => {
      (fs as any).createReadStream = origCreateReadStream;
      try {
        expect(length).toBe(1);
        expect(db.get('k')).toBe(val);
        try { fs.unlinkSync(file); } catch {}
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch {}
        done(e);
      }
    });
    
    db.on('error', (err: Error) => {
      (fs as any).createReadStream = origCreateReadStream;
      try { fs.unlinkSync(file); } catch {}
      done(err);
    });
  });
});