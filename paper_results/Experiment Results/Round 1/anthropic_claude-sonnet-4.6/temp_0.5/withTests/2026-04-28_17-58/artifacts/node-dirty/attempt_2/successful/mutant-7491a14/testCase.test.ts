import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty chunk boundary unicode', () => {
  it('should correctly parse unicode characters that span chunk boundaries', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-boundary-${process.pid}.dirty`);
    
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    
    // Default highWaterMark is 64 * 1024 = 65536 bytes
    const CHUNK_SIZE = 65536;
    
    // Create a line that ends just before the chunk boundary
    // We want a multi-byte character (4-byte emoji) to straddle the boundary
    // First, create padding to position the emoji at the boundary
    
    // A 4-byte emoji: 🎉 = F0 9F 8E 89
    const emoji = '🎉';
    
    // Build a JSON line with the emoji value
    const emojiEntry = JSON.stringify({ key: 'test', val: emoji });
    // emojiEntry length in bytes
    const emojiEntryBytes = Buffer.byteLength(emojiEntry + '\n', 'utf-8');
    
    // We want the emoji (which is at some offset in emojiEntry) to straddle CHUNK_SIZE
    // The emoji starts at byte offset: Buffer.byteLength(JSON.stringify({key:'test',val:'}) , 'utf-8')
    const prefixBytes = Buffer.byteLength('{"key":"test","val":"', 'utf-8');
    
    // We need padding so that: paddingBytes + prefixBytes + 1 = CHUNK_SIZE
    // (the +1 means the first byte of the emoji is at CHUNK_SIZE - 1, so bytes 2,3,4 are in next chunk)
    // Actually let's place it so byte 1 of emoji is at CHUNK_SIZE - 1
    const paddingNeeded = CHUNK_SIZE - prefixBytes - 1;
    
    // Create padding as many single-byte JSON entries
    // Each entry: {"key":"kXXXXX","val":"v"}\n
    // Let's use a single large padding entry
    const paddingKey = 'p';
    const paddingValLength = paddingNeeded - Buffer.byteLength(`{"key":"${paddingKey}","val":""}\n`, 'utf-8');
    
    if (paddingValLength < 0) {
      // fallback: just write the file directly
      const lines: string[] = [];
      // fill up to just before chunk boundary
      let totalBytes = 0;
      let i = 0;
      while (totalBytes < CHUNK_SIZE - 100) {
        const line = JSON.stringify({ key: `k${i}`, val: 'v' }) + '\n';
        lines.push(line);
        totalBytes += Buffer.byteLength(line, 'utf-8');
        i++;
      }
      // Now add padding to get exactly to boundary - prefixBytes - 1
      const remaining = CHUNK_SIZE - totalBytes - prefixBytes - 1;
      if (remaining > 0) {
        const padLine = JSON.stringify({ key: 'pad', val: 'x'.repeat(remaining - Buffer.byteLength('{"key":"pad","val":""}\n', 'utf-8') + 1) }) + '\n';
        lines.push(padLine);
      }
      lines.push(emojiEntry + '\n');
      fs.writeFileSync(file, lines.join(''), 'utf-8');
    } else {
      const paddingVal = 'x'.repeat(paddingValLength);
      const paddingLine = JSON.stringify({ key: paddingKey, val: paddingVal }) + '\n';
      fs.writeFileSync(file, paddingLine + emojiEntry + '\n', 'utf-8');
    }
    
    // Verify the file has the emoji at the right position
    const fileContent = fs.readFileSync(file);
    
    const db = new Dirty(file);
    db.on('load', (length: number) => {
      try {
        expect(db.get('test')).toBe(emoji);
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
        done(err);
      }
    });
    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
      done(err);
    });
  });
});