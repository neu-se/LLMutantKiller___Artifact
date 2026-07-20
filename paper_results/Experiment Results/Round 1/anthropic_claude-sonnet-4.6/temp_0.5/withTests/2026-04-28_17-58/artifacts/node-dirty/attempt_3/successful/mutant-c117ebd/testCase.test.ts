import * as fs from 'fs';
import * as os from 'os';

describe('dirty read stream encoding', () => {
  it('should correctly handle multi-byte UTF-8 characters at chunk boundaries', (done) => {
    const filePath = `${os.tmpdir()}/dirty-multibyte-${process.pid}.dirty`;
    
    // Create content where a multi-byte character falls at the chunk boundary
    // Default chunk size is 65536 bytes
    const CHUNK_SIZE = 65536;
    
    // Use a 3-byte UTF-8 character: '€' = 0xE2 0x82 0xAC
    const multiByteChar = '€'; // 3 bytes in UTF-8
    
    // We need to position this character so it spans a chunk boundary
    // Fill with ASCII up to just before the boundary, then put multi-byte char
    
    // First row: fill most of the chunk
    // JSON overhead: {"key":"...","val":"..."}\n
    // Let's create a key that positions the value's multi-byte char at boundary
    
    // Simpler approach: create a large value that ends with multi-byte chars
    // positioned at the chunk boundary
    
    // Row format: {"key":"k","val":"<padding><multibyte>"}\n
    // We need total bytes before the multibyte char = CHUNK_SIZE - 1 (split in middle)
    
    const prefix = '{"key":"k","val":"';
    const suffix = '"}\n';
    // prefix.length bytes + padding + multiByteChar(3 bytes) + suffix
    // We want the multibyte char to start at byte CHUNK_SIZE - 1
    // So padding length = CHUNK_SIZE - 1 - prefix.length - (we want byte 2 of the 3-byte char in next chunk)
    // Actually let's put the char starting at CHUNK_SIZE - 1 (so byte 0 is in chunk 1, bytes 1,2 in chunk 2)
    
    const paddingLength = CHUNK_SIZE - 1 - prefix.length;
    const padding = 'a'.repeat(paddingLength);
    const content = prefix + padding + multiByteChar + suffix;
    
    fs.writeFileSync(filePath, content); // write as buffer, no encoding
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(filePath);

    db.on('load', (length: number) => {
      try {
        expect(length).toBe(1);
        expect(db.get('k')).toBe(padding + multiByteChar);
        fs.unlinkSync(filePath);
        done();
      } catch (e) {
        try { fs.unlinkSync(filePath); } catch (_) {}
        done(e);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(filePath); } catch (_) {}
      done(err);
    });
  });
});