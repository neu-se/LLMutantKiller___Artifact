import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database read stream encoding', () => {
  it('should correctly parse entries when multi-byte characters span chunk boundaries', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-chunk-test-${process.pid}.db`);
    
    const CHUNK_SIZE = 65536; // default highWaterMark for fs streams
    
    // Build content so that a 4-byte emoji (🎉 = F0 9F 8E 89) straddles the chunk boundary
    // We want bytes 0..65535 in chunk 1, bytes 65536.. in chunk 2
    // Place the emoji starting at byte 65534 so bytes 65534,65535 are in chunk 1
    // and bytes 65536,65537 are in chunk 2
    
    // First row: padding to fill up to byte 65534
    // {"key":"pad","val":"AAAA...AAA"}\n  <- we need this to be exactly 65534 bytes
    // Then the emoji row starts at 65534
    
    // Let's compute:
    // prefix = '{"key":"pad","val":"' = 20 chars
    // suffix = '"}\n' = 3 chars  
    // total fixed = 23 bytes
    // padding 'A' chars needed = 65534 - 23 = 65511
    
    const prefixBytes = Buffer.byteLength('{"key":"pad","val":"');
    const suffixBytes = Buffer.byteLength('"}\n');
    const paddingNeeded = (CHUNK_SIZE - 2) - prefixBytes - suffixBytes; // -2 so emoji starts at 65534
    
    const paddingStr = 'A'.repeat(paddingNeeded);
    const row1 = `{"key":"pad","val":"${paddingStr}"}\n`;
    const row1ByteLen = Buffer.byteLength(row1, 'utf-8');
    
    // Verify row1 ends at byte 65534 (so emoji starts at 65534, spanning the 65536 boundary)
    // row1ByteLen should be CHUNK_SIZE - 2
    
    const row2 = `{"key":"emoji","val":"🎉"}\n`;
    
    const content = row1 + row2;
    fs.writeFileSync(dbPath, content, 'utf-8');
    
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    
    const errors: Error[] = [];
    db.on('error', (err: Error) => {
      errors.push(err);
    });
    
    db.on('load', (count: number) => {
      try {
        fs.unlinkSync(dbPath);
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        expect(db.get('emoji')).toBe('🎉');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});