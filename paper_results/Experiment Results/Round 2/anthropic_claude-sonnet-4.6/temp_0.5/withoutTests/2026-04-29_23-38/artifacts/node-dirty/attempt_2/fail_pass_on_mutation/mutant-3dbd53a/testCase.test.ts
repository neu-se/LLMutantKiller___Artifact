import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should write UTF-8 encoded bytes for multi-byte characters', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
    const dbPath = path.join(tmpDir, 'test.db');
    const db = new Dirty(dbPath);
    
    // 'é' is U+00E9: 2 bytes in UTF-8 (0xC3 0xA9), 1 byte in latin1 (0xE9)
    const testValue = 'caf\u00e9'; // "café"
    
    db.on('load', () => {
      db.set('k', testValue, () => {
        const rawBuffer = fs.readFileSync(dbPath);
        // The JSON line should be: {"key":"k","val":"café"}\n
        // In UTF-8, 'é' takes 2 bytes, so the JSON string "café" in UTF-8 is 5 bytes
        // In latin1, 'é' takes 1 byte, so the JSON string "café" in latin1 is 4 bytes
        
        // Try to parse the file as UTF-8
        const asUtf8 = rawBuffer.toString('utf-8');
        
        // If encoding was correct (UTF-8), we should be able to parse and get back the original value
        let parsed: any;
        try {
          parsed = JSON.parse(asUtf8.trim());
          expect(parsed.val).toBe(testValue);
        } catch (e) {
          // UTF-8 parse failed - encoding was wrong
          fail('File content is not valid UTF-8 JSON - encoding may be incorrect');
        }
        
        fs.rmSync(tmpDir, { recursive: true });
        done();
      });
    });
    
    db.on('error', done);
  });
});