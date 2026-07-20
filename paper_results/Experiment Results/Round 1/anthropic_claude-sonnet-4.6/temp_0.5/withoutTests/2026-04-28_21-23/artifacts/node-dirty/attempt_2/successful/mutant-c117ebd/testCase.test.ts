import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('Dirty read stream encoding', () => {
  it('should correctly handle multi-byte UTF-8 characters that span chunk boundaries', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Default highWaterMark for createReadStream is 64 * 1024 = 65536 bytes
    const CHUNK_SIZE = 65536;
    
    // Create padding to push a multi-byte character to span the chunk boundary
    // We'll put a 2-byte UTF-8 character (é = 0xC3 0xA9) at the boundary
    // The character needs to be inside a JSON string value
    
    // First, create a row that will end just before the chunk boundary
    // Then create a row where a multi-byte char spans the boundary
    
    // Let's calculate: we need the first byte of é to be at position CHUNK_SIZE - 1
    // and the second byte at position CHUNK_SIZE
    
    // A simple JSON row: {"key":"k","val":"...é..."}\n
    // Let's build it precisely
    
    const prefix = '{"key":"padding","val":"';
    const suffix = '"}\n';
    
    // We want the total file content up to the é to be CHUNK_SIZE - 1 bytes
    // So the padding length = CHUNK_SIZE - 1 - prefix.length - suffix.length - 2 (for é's first byte position)
    // Actually: we want byte at index CHUNK_SIZE-1 to be 0xC3 (first byte of é)
    // and byte at index CHUNK_SIZE to be 0xA9 (second byte of é)
    
    // Total bytes before é = CHUNK_SIZE - 1
    // prefix bytes = prefix.length (all ASCII)
    // padding bytes = CHUNK_SIZE - 1 - prefix.length
    // But we also need the padding to be valid JSON string content (no special chars)
    
    const paddingLength = CHUNK_SIZE - 1 - prefix.length;
    const padding = 'x'.repeat(paddingLength);
    
    // The row with é spanning the boundary
    const specialRow = prefix + padding + 'é' + suffix;
    
    // Verify the é is at the right position
    const specialRowBytes = Buffer.from(specialRow, 'utf-8');
    // The é should be at bytes CHUNK_SIZE-1 and CHUNK_SIZE
    // specialRowBytes[CHUNK_SIZE-1] should be 0xC3
    // specialRowBytes[CHUNK_SIZE] should be 0xA9
    
    fs.writeFileSync(dbPath, specialRowBytes);
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err: Error) => {
      errors.push(err);
    });
    
    db.on('load', (count: number) => {
      try {
        // With encoding 'utf-8': StringDecoder handles the split é correctly
        // With encoding '': Buffer mode, chunk1.toString() produces corrupted é
        // leading to JSON parse error or wrong value
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('padding')).toBe(padding + 'é');
        
        db.close();
        db.once('write_close', () => {
          try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
          done();
        });
      } catch (e) {
        try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
        done(e as Error);
      }
    });
  });
});