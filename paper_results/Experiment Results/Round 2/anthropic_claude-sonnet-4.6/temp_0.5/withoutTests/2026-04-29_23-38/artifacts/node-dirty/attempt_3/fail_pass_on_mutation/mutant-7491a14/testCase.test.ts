import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database read stream encoding', () => {
  it('should correctly parse entries when multi-byte UTF-8 characters span chunk boundaries', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-chunk-test-${process.pid}.db`);
    
    const CHUNK_SIZE = 65536;
    
    // Build the file content as a Buffer to have exact byte control
    // Row 1: padding to fill exactly CHUNK_SIZE - 2 bytes
    // Then emoji 🎉 (4 bytes: F0 9F 8E 89) starts at byte CHUNK_SIZE - 2
    // Bytes CHUNK_SIZE-2 and CHUNK_SIZE-1 are in chunk 1
    // Bytes CHUNK_SIZE and CHUNK_SIZE+1 are in chunk 2
    
    const emojiBytes = Buffer.from('🎉', 'utf-8'); // [0xF0, 0x9F, 0x8E, 0x89]
    
    // Row 2 as buffer
    const row2Prefix = Buffer.from('{"key":"emoji","val":"', 'utf-8');
    const row2Suffix = Buffer.from('"}\n', 'utf-8');
    const row2 = Buffer.concat([row2Prefix, emojiBytes, row2Suffix]);
    
    // Row 1 must be exactly CHUNK_SIZE - 2 bytes
    // Row 1 = {"key":"pad","val":"AAA..."}\n
    const row1Prefix = Buffer.from('{"key":"pad","val":"', 'utf-8');
    const row1Suffix = Buffer.from('"}\n', 'utf-8');
    const paddingLen = (CHUNK_SIZE - 2) - row1Prefix.length - row1Suffix.length;
    const padding = Buffer.alloc(paddingLen, 0x41); // 'A'
    const row1 = Buffer.concat([row1Prefix, padding, row1Suffix]);
    
    // Verify
    if (row1.length !== CHUNK_SIZE - 2) {
      done(new Error(`row1.length=${row1.length}, expected ${CHUNK_SIZE - 2}`));
      return;
    }
    
    // The emoji starts at byte CHUNK_SIZE - 2
    // Chunk 1 = bytes 0..65535 (contains first 2 bytes of emoji: F0 9F)
    // Chunk 2 = bytes 65536.. (contains last 2 bytes of emoji: 8E 89)
    
    const fileContent = Buffer.concat([row1, row2]);
    fs.writeFileSync(dbPath, fileContent);
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', () => {
      try {
        fs.unlinkSync(dbPath);
        expect(errors).toHaveLength(0);
        expect(db.get('emoji')).toBe('🎉');
        done();
      } catch (e) {
        try { fs.unlinkSync(dbPath); } catch {}
        done(e);
      }
    });
  });
});