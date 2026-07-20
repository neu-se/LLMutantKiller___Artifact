import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should correctly load multi-byte UTF-8 characters that may span chunk boundaries', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Create enough data to force multiple read chunks (default highWaterMark is 64KB)
    const multiByteStr = '日本語テスト'; // Each char is 3 bytes in UTF-8
    const rows: string[] = [];
    for (let i = 0; i < 5000; i++) {
      rows.push(JSON.stringify({ key: `key${i}`, val: multiByteStr }));
    }
    const content = rows.join('\n') + '\n';
    fs.writeFileSync(dbPath, content, 'utf-8');
    
    let errorOccurred = false;
    const db = new Dirty(dbPath);
    
    db.on('error', () => { errorOccurred = true; });
    
    db.on('load', (count: number) => {
      try {
        expect(errorOccurred).toBe(false);
        expect(count).toBe(5000);
        // Verify a key that might be at a chunk boundary has correct value
        for (let i = 0; i < 5000; i++) {
          const val = db.get(`key${i}`);
          if (val !== multiByteStr) {
            throw new Error(`key${i} has corrupted value: ${val}`);
          }
        }
        db.close();
        db.once('write_close', () => { fs.rmSync(tmpDir, { recursive: true }); done(); });
      } catch(e) { fs.rmSync(tmpDir, { recursive: true }); done(e); }
    });
  }, 10000);
});