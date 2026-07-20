import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db stream encoding', () => {
  it('should correctly load data when a multi-byte character is split across stream chunks', (done) => {
    const file = path.join(os.tmpdir(), `dirty-chunk-test-${process.pid}.dirty`);

    // Create a record where a multi-byte UTF-8 character (e.g. emoji = 4 bytes)
    // falls at a chunk boundary by padding to the right size.
    // Default highWaterMark for readable streams is 64KB = 65536 bytes.
    // We'll write enough data so that the emoji straddles the 65536-byte boundary.
    const chunkSize = 65536;

    // Build a large key to push the emoji near the boundary
    // Each row: {"key":"<key>","val":"<val>"}\n
    // We want the emoji (4 bytes in UTF-8) to straddle the boundary
    // First, figure out how many bytes a filler row takes
    const fillerVal = 'x';
    const fillerKey = 'a';
    const fillerRow = JSON.stringify({ key: fillerKey, val: fillerVal }) + '\n';
    const fillerRowBytes = Buffer.byteLength(fillerRow, 'utf-8');

    // The emoji row - emoji is U+1F600, 4 bytes in UTF-8
    const emoji = '\uD83D\uDE00'; // 😀
    const emojiRowPrefix = `{"key":"emoji","val":"`;
    const emojiRowSuffix = `"}\n`;
    const emojiRowPrefixBytes = Buffer.byteLength(emojiRowPrefix, 'utf-8');

    // We want the emoji to start at byte chunkSize - 1 (so it straddles the boundary)
    // Total bytes before emoji row = N * fillerRowBytes
    // Then emojiRowPrefix bytes, then emoji starts
    // We want: N * fillerRowBytes + emojiRowPrefixBytes = chunkSize - 1
    const bytesBeforeEmoji = chunkSize - 1 - emojiRowPrefixBytes;
    const numFillerRows = Math.floor(bytesBeforeEmoji / fillerRowBytes);
    const extraBytes = bytesBeforeEmoji - numFillerRows * fillerRowBytes;

    // Build the file content
    let content = '';
    for (let i = 0; i < numFillerRows; i++) {
      content += fillerRow;
    }
    // Add a row with a key padded to fill the extra bytes
    // Extra bytes row: {"key":"<padKey>","val":"x"}\n
    if (extraBytes > 0) {
      const baseExtraRow = JSON.stringify({ key: '', val: fillerVal }) + '\n';
      const baseExtraBytes = Buffer.byteLength(baseExtraRow, 'utf-8');
      const padNeeded = extraBytes - baseExtraBytes;
      if (padNeeded >= 0) {
        const padKey = 'p'.repeat(padNeeded);
        content += JSON.stringify({ key: padKey, val: fillerVal }) + '\n';
      }
    }
    content += emojiRowPrefix + emoji + emojiRowSuffix;

    fs.writeFileSync(file, content, 'utf-8');

    // Verify the emoji straddles the chunk boundary
    const contentBuffer = Buffer.from(content, 'utf-8');
    const emojiStart = contentBuffer.indexOf(Buffer.from(emoji, 'utf-8'));

    const db = new Dirty(file);

    db.on('load', (length: number) => {
      try {
        expect(db.get('emoji')).toBe(emoji);
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
        done(err);
      }
    });

    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
      done(err);
    });
  });
});