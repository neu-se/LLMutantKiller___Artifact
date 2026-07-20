import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should correctly handle multi-byte UTF-8 characters split across read chunks', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-multibyte-${process.pid}.db`);

    // The default highWaterMark for fs.createReadStream is 64 * 1024 = 65536 bytes
    // We need to place a multi-byte character exactly at the chunk boundary
    // A 2-byte UTF-8 char (e.g., é = 0xC3 0xA9) split: first byte in chunk1, second in chunk2
    
    // Row structure: {"key":"k","val":"<padding><char>"}\n
    // {"key":"k","val":"} = 18 bytes
    // "}\n = 3 bytes  
    // Total overhead = 21 bytes
    // We want the 2-byte char to start at byte 65535 (so byte 65535 in chunk1, 65536 in chunk2... wait, 0-indexed)
    // Chunk 1: bytes 0..65535 (65536 bytes)
    // We want char byte 0 at index 65535, char byte 1 at index 65536
    // So padding length = 65535 - 18 = 65517 bytes
    
    const HWM = 65536;
    const prefix = '{"key":"k","val":"';  // 18 bytes
    const suffix = '"}\n';                  // 3 bytes
    const twoByteChar = '\u00e9';           // é: UTF-8 bytes C3 A9 (2 bytes)
    
    // padding fills bytes 18..(HWM-2), so padding length = HWM - 2 - 18 = HWM - 20
    const paddingLen = HWM - 2 - prefix.length; // 65536 - 2 - 18 = 65516
    const padding = 'a'.repeat(paddingLen);
    
    // File: prefix(18) + padding(65516) + twoByteChar(2) + suffix(3)
    // = 18 + 65516 + 2 + 3 = 65539 bytes
    // Chunk 1: bytes 0..65535 = prefix + padding + first byte of twoByteChar
    // Chunk 2: bytes 65536..65538 = second byte of twoByteChar + suffix
    
    const rowContent = prefix + padding + twoByteChar + suffix;
    const rowBytes = Buffer.from(rowContent, 'utf-8');
    
    // Verify our math
    // prefix = 18 bytes, padding = 65516 bytes (all ASCII), twoByteChar = 2 bytes, suffix = 3 bytes
    // Total = 65539 bytes
    // Byte at index 65534 = last 'a' of padding
    // Byte at index 65535 = 0xC3 (first byte of é)  <- end of chunk 1
    // Byte at index 65536 = 0xA9 (second byte of é) <- start of chunk 2
    
    fs.writeFileSync(dbPath, rowBytes);
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('k')).toBe(padding + twoByteChar);
        done();
      } catch(e) {
        done(e);
      } finally {
        try { fs.unlinkSync(dbPath); } catch(e) {}
      }
    });
  });
});