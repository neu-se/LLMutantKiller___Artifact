import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should correctly load data when multi-byte UTF-8 chars are split across read chunks', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Craft content so a multi-byte char lands exactly at a chunk boundary
    // Default highWaterMark for fs.createReadStream is 64KB = 65536 bytes
    const CHUNK_SIZE = 65536;
    
    // Fill up to just before the boundary with ASCII, then put multi-byte chars at boundary
    const multiByteChar = '€'; // 3 bytes: 0xE2 0x82 0xAC
    
    // Create a row that ends right at the chunk boundary with a multi-byte char split
    // Row format: {"key":"k","val":"..."}\n
    const prefix = '{"key":"k","val":"';
    const suffix = '"}\n';
    // We want the total file to have a multi-byte char straddling position CHUNK_SIZE
    // prefix.length + padding + multiByteChar bytes + suffix
    // Let's put the multi-byte char such that its first byte is at CHUNK_SIZE - 1
    const paddingLen = CHUNK_SIZE - 1 - prefix.length;
    const padding = 'a'.repeat(paddingLen);
    const content = prefix + padding + multiByteChar + suffix;
    
    fs.writeFileSync(dbPath, content); // write as binary to ensure exact byte placement
    
    let errorOccurred = false;
    const db = new Dirty(dbPath);
    
    db.on('error', () => { errorOccurred = true; });
    
    db.on('load', (count: number) => {
      try {
        expect(errorOccurred).toBe(false);
        expect(count).toBe(1);
        expect(db.get('k')).toBe(padding + multiByteChar);
        db.close();
        db.once('write_close', () => {
          fs.rmSync(tmpDir, { recursive: true });
          done();
        });
      } catch(e) {
        fs.rmSync(tmpDir, { recursive: true });
        done(e);
      }
    });
  }, 10000);
});