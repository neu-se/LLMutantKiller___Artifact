import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db stream encoding', () => {
  it('should correctly load a record whose multi-byte UTF-8 character is split exactly at the 65536-byte stream chunk boundary', (done) => {
    const file = path.join(os.tmpdir(), `dirty-boundary-test-${process.pid}.dirty`);

    // Default highWaterMark for fs.createReadStream is 64 * 1024 = 65536 bytes
    const CHUNK_SIZE = 65536;

    // We'll construct file content so that a 3-byte UTF-8 character (e.g. '€' = 0xE2 0x82 0xAC)
    // starts at byte CHUNK_SIZE - 1 (so bytes CHUNK_SIZE-1, CHUNK_SIZE, CHUNK_SIZE+1 span the boundary)
    // This means the first chunk ends with 0xE2 (incomplete sequence)
    // Without StringDecoder (mutated), Buffer.toString() will produce U+FFFD replacement char
    // With StringDecoder (original), it correctly reassembles the character

    const euro = '\u20AC'; // € = 3 bytes in UTF-8: E2 82 AC
    const euroBuf = Buffer.from(euro, 'utf-8');
    expect(euroBuf.length).toBe(3); // sanity check

    // Build prefix: we want exactly CHUNK_SIZE - 1 bytes before the euro sign
    // The euro sign will be inside a JSON value field
    // Row format: {"key":"eurokey","val":"<padding>€"}\n
    const rowPrefix = '{"key":"eurokey","val":"';
    const rowSuffix = '"}\n';
    const rowPrefixBytes = Buffer.byteLength(rowPrefix, 'utf-8');
    const rowSuffixBytes = Buffer.byteLength(rowSuffix, 'utf-8');

    // We need: fillerBytes + rowPrefixBytes = CHUNK_SIZE - 1
    // where fillerBytes = bytes of filler rows before this row + padding in this row
    // Let's put the euro at position CHUNK_SIZE - 1
    // So bytes before euro = CHUNK_SIZE - 1
    // bytes before euro = fillerRowsBytes + rowPrefixBytes + paddingBytes
    // paddingBytes = CHUNK_SIZE - 1 - fillerRowsBytes - rowPrefixBytes

    // Use simple ASCII filler rows
    const fillerRow = '{"key":"f","val":"v"}\n'; // 22 bytes
    const fillerRowBytes = Buffer.byteLength(fillerRow, 'utf-8');

    const bytesBeforeEuro = CHUNK_SIZE - 1;
    const bytesForPadding = bytesBeforeEuro - rowPrefixBytes;
    const numFillerRows = Math.floor(bytesForPadding / fillerRowBytes);
    const remainingBytes = bytesForPadding - numFillerRows * fillerRowBytes;

    // Build content
    let fillerContent = '';
    for (let i = 0; i < numFillerRows; i++) {
      fillerContent += fillerRow;
    }
    const padding = 'x'.repeat(remainingBytes);
    const euroRow = rowPrefix + padding + euro + rowSuffix;

    const fullContent = fillerContent + euroRow;
    const fullBuf = Buffer.from(fullContent, 'utf-8');

    // Verify euro starts at CHUNK_SIZE - 1
    const euroBufInContent = Buffer.from(euro, 'utf-8');
    const euroPos = fullBuf.indexOf(euroBufInContent);

    fs.writeFileSync(file, fullBuf);

    if (euroPos !== CHUNK_SIZE - 1) {
      fs.unlinkSync(file);
      // Skip if we couldn't position correctly
      done();
      return;
    }

    const db = new Dirty(file);
    const errors: Error[] = [];

    db.on('error', (err: Error) => {
      errors.push(err);
    });

    db.on('load', (length: number) => {
      try {
        expect(errors.length).toBe(0);
        expect(db.get('eurokey')).toBe(padding + euro);
        fs.unlinkSync(file);
        done();
      } catch (err) {
        try { fs.unlinkSync(file); } catch (_) { /* ignore */ }
        done(err);
      }
    });
  });
});