import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('handles multi-byte chars at exact chunk boundary', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-boundary-${process.pid}.db`);

    // é in UTF-8 = [0xC3, 0xA9] (2 bytes)
    // We want byte 65535 = 0xC3, byte 65536 = 0xA9
    // File layout: {"key":"k","val":"<padding>é"}\n
    // prefix bytes: {"key":"k","val":" = 18 bytes (all ASCII)
    // We want é to start at byte 65534 (0-indexed), so:
    // padding length = 65534 - 18 = 65516 bytes
    // Then é = 2 bytes at positions 65534, 65535
    // Then "}\n = 3 bytes at 65536, 65537, 65538
    // Chunk 1 (bytes 0-65535): prefix(18) + padding(65516) + 0xC3(1) = 65535 bytes... 
    
    // Wait, chunk 1 is bytes [0, 65535] inclusive = 65536 bytes
    // We want 0xC3 at index 65535 and 0xA9 at index 65536
    // prefix = 18 bytes (indices 0-17)
    // padding starts at index 18
    // é starts at index 65535, so padding length = 65535 - 18 = 65517
    // é byte 0 (0xC3) at index 65535
    // é byte 1 (0xA9) at index 65536
    
    const HWM = 65536;
    const prefix = '{"key":"k","val":"'; // exactly 18 ASCII bytes
    const eAccent = '\u00e9'; // é: UTF-8 = [0xC3, 0xA9]
    const suffix = '"}\n'; // 3 ASCII bytes
    
    const paddingLen = HWM - 1 - prefix.length; // 65536 - 1 - 18 = 65517
    const padding = 'a'.repeat(paddingLen);
    
    const content = prefix + padding + eAccent + suffix;
    const contentBytes = Buffer.from(content, 'utf-8');
    
    // Verify layout
    console.log('Total bytes:', contentBytes.length);
    console.log('Byte at HWM-1:', contentBytes[HWM-1].toString(16)); // should be C3
    console.log('Byte at HWM:', contentBytes[HWM].toString(16));     // should be A9
    
    fs.writeFileSync(dbPath, contentBytes);
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        const val = db.get('k');
        expect(val).toBe(padding + eAccent);
        done();
      } catch(e) {
        done(e);
      } finally {
        try { fs.unlinkSync(dbPath); } catch(e) {}
      }
    });
  });
});