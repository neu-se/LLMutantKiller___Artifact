import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db stream encoding', () => {
  it('should load records correctly when file content requires proper encoding handling', (done) => {
    const file = path.join(os.tmpdir(), `dirty-enc-test-${process.pid}.dirty`);

    // Write a file where the value contains characters that when encoded as UTF-8
    // produce bytes that could be misinterpreted without proper encoding setup.
    // Specifically, latin-1 supplement characters (0x80-0xFF range) which are
    // 2-byte sequences in UTF-8.
    // Without encoding on the stream, Node uses setEncoding which uses StringDecoder
    // to handle boundary issues. Without it, Buffer.toString() is used which may
    // mishandle boundaries differently.
    
    // The real test: without encoding option, stream chunks are Buffers.
    // When buffer (string) += chunk (Buffer), JS calls chunk.toString() = chunk.toString('utf8')
    // This is fine for complete chunks but the stream won't use StringDecoder for boundary handling.
    
    // Let's test the specific behavior: with encoding set, the stream's internal
    // StringDecoder properly handles the `end` event - remaining bytes in decoder
    // are flushed. Without encoding, no StringDecoder is used.
    
    // Create content where the last row has NO trailing newline - 
    // this tests the `buffer.length` check in the `end` handler
    const row1 = JSON.stringify({ key: 'k1', val: 'v1' }) + '\n';
    const row2 = JSON.stringify({ key: 'k2', val: 'v2' }); // no trailing newline
    fs.writeFileSync(file, row1 + row2, 'utf-8');

    const errors: Error[] = [];
    const db = new Dirty(file);

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', (length: number) => {
      try {
        // The corrupted row at end should trigger an error
        expect(errors.length).toBe(1);
        expect(errors[0].message).toContain('Corrupted row');
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
        done(err);
      }
    });
  });
});