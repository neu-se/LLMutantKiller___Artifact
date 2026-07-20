import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database encoding', () => {
  it('should correctly load a row whose JSON exceeds the stream highWaterMark', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-hwm-test-${process.pid}.db`);

    // Create a value large enough that the row spans multiple read chunks
    // Default highWaterMark for fs streams is 64KB
    // With encoding:'utf-8', Node joins chunks at char boundaries before emitting
    // With encoding:'', chunks are raw Buffers; buffer += chunk calls Buffer.toString()
    // but chunk.lastIndexOf('\n') on a Buffer mid-row returns -1, causing early return
    // WITHOUT processing - but buffer already has the partial data appended.
    // Then the NEXT chunk also gets appended. The split('\n') at end should still work...
    
    // Actually let me verify: the check is AFTER buffer += chunk
    // So buffer accumulates correctly regardless. The early return just skips splitting.
    // This means the logic IS correct for buffers too for the newline detection case.
    
    // The REAL difference must be multi-byte char splitting across chunk boundaries.
    // With encoding:'utf-8', Node.js StringDecoder handles this.
    // With encoding:'', raw Buffer chunks can split multi-byte chars.
    // When Buffer is coerced to string via +=, it calls toString('utf8') on each chunk
    // independently, which WILL corrupt split multi-byte characters.
    
    // Force a split by making the file exactly at a boundary with emoji at that boundary
    // highWaterMark default is 65536 bytes
    const HWM = 65536;
    
    // Build content so that a 4-byte emoji straddles the chunk boundary
    // Row 1: pad to HWM-2 bytes, then add emoji + newline
    // The emoji (4 bytes) will be split: 2 bytes in chunk1, 2 bytes in chunk2
    const emoji = '\u{1F600}'; // 4 bytes in UTF-8: F0 9F 98 80
    
    // We need the emoji to straddle the boundary
    // Put 2 bytes of the emoji at end of first chunk, 2 bytes at start of second
    // Row content before emoji: HWM - 2 bytes (so emoji bytes 1-2 are at HWM-2, HWM-1)
    // JSON overhead: {"key":"k","val":"...emoji..."}\n
    // {"key":"k","val":"} = 18 chars, then val content, then "}\n = 3 chars
    // Total = 18 + valLength*utf8bytes + 3 = HWM + something
    
    const prefix = '{"key":"k","val":"';
    const suffix = '"}\n';
    const overhead = prefix.length + suffix.length; // 18 + 3 = 21
    // We want the emoji (4 bytes) to start at position HWM-2 in the file
    // So padding before emoji = HWM - 2 - overhead bytes
    const paddingLen = HWM - 2 - overhead;
    const padding = 'a'.repeat(paddingLen);
    const rowContent = prefix + padding + emoji + suffix;
    
    fs.writeFileSync(dbPath, rowContent, 'utf-8');
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err: Error) => {
      errors.push(err);
    });
    
    db.on('load', (count: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('k')).toBe(padding + emoji);
        done();
      } catch (err) {
        done(err);
      } finally {
        try { fs.unlinkSync(dbPath); } catch (e) {}
      }
    });
  });
});