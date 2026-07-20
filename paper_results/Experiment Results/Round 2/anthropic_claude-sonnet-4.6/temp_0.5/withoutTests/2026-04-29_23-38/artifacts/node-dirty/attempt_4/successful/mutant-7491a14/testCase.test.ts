import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

describe('Dirty database read stream encoding', () => {
  it('should correctly decode a 2-byte UTF-8 character split across read chunk boundary', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `dirty-enc-${process.pid}.db`);
    
    // Default highWaterMark for fs.createReadStream is 64 * 1024 = 65536 bytes
    const CHUNK_SIZE = 65536;
    
    // 'é' = 2 bytes: 0xC3 0xA9
    // Place 0xC3 at byte CHUNK_SIZE - 1 = 65535 (last byte of chunk 1)
    // Place 0xA9 at byte CHUNK_SIZE = 65536 (first byte of chunk 2)
    //
    // Without encoding: chunk1.toString('utf8') replaces incomplete 0xC3 with '\uFFFD'
    //                   chunk2.toString('utf8') replaces orphan 0xA9 with '\uFFFD'
    //                   => db.get('test') = '\uFFFD\uFFFD' ≠ 'é'
    //
    // With encoding 'utf-8': StringDecoder holds 0xC3, completes with 0xA9 => 'é'
    //                        => db.get('test') = 'é'
    
    // testRow = {"key":"test","val":"é"}\n
    // testRowPrefix = {"key":"test","val":" = 21 bytes
    const testRowPrefix = Buffer.from('{"key":"test","val":"', 'utf-8');
    // Verify: {=1 "key"=5 :=1 "test"=6 ,=1 "val"=5 :=1 "=1 => 21 bytes
    
    const eChar = Buffer.from('é', 'utf-8'); // [0xC3, 0xA9] = 2 bytes
    const testRowSuffix = Buffer.from('"}\n', 'utf-8'); // 3 bytes
    const testRow = Buffer.concat([testRowPrefix, eChar, testRowSuffix]);
    
    // 'é' starts at byte: padRow.length + testRowPrefix.length = CHUNK_SIZE - 1 = 65535
    // padRow.length = CHUNK_SIZE - 1 - testRowPrefix.length = 65535 - 21 = 65514
    const targetPadRowLength = CHUNK_SIZE - 1 - testRowPrefix.length;
    
    // padRow = {"key":"pad","val":"AAAA..."}\n
    // padRowPrefix = {"key":"pad","val":" = 20 bytes
    const padRowPrefix = Buffer.from('{"key":"pad","val":"', 'utf-8');
    // Verify: {=1 "key"=5 :=1 "pad"=5 ,=1 "val"=5 :=1 "=1 => 20 bytes
    
    const padRowSuffix = Buffer.from('"}\n', 'utf-8'); // 3 bytes
    const padRowPaddingLen = targetPadRowLength - padRowPrefix.length - padRowSuffix.length;
    // = 65514 - 20 - 3 = 65491
    
    const padRowPadding = Buffer.alloc(padRowPaddingLen, 0x41); // 'A'
    const padRow = Buffer.concat([padRowPrefix, padRowPadding, padRowSuffix]);
    
    // Final verification:
    // padRow.length = 20 + 65491 + 3 = 65514
    // 'é' starts at byte 65514 + 21 = 65535 = CHUNK_SIZE - 1 ✓
    // Chunk 1 (bytes 0-65535): contains 0xC3 at byte 65535
    // Chunk 2 (bytes 65536+): starts with 0xA9
    
    const fileContent = Buffer.concat([padRow, testRow]);
    fs.writeFileSync(dbPath, fileContent);
    
    jest.resetModules();
    const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');
    const db = new Dirty(dbPath);
    
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (count: number) => {
      try {
        fs.unlinkSync(dbPath);
      } catch {}
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(2);
        expect(db.get('test')).toBe('é');
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});