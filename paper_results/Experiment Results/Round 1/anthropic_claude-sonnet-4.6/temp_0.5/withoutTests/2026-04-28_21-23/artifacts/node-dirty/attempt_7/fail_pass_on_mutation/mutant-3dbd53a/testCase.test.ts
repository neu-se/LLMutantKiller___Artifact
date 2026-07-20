import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty write stream encoding', () => {
  it('should correctly encode non-ASCII characters to disk', (done) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-enc-'));
    const dbPath = path.join(tmpDir, 'test.db');
    
    // Use a character that would be encoded differently in latin1 vs utf-8
    // é = 0xC3 0xA9 in UTF-8, 0xE9 in latin1
    const testVal = '\u00e9'; // é
    
    const db = new Dirty(dbPath);
    
    db.on('load', () => {
      db.set('key', testVal, () => {
        db.close();
        db.once('write_close', () => {
          const rawBytes = fs.readFileSync(dbPath);
          // In UTF-8, é is encoded as 0xC3 0xA9
          // The JSON would be: {"key":"key","val":"é"}\n
          // Find the position of é in the file
          const content = rawBytes.toString('utf-8');
          const parsed = JSON.parse(content.trim());
          expect(parsed.val).toBe(testVal);
          
          // Also verify the raw bytes contain UTF-8 encoding of é
          // UTF-8 for é: 0xC3 0xA9
          const hasUtf8E = rawBytes.includes(Buffer.from([0xC3, 0xA9]));
          expect(hasUtf8E).toBe(true);
          
          fs.rmSync(tmpDir, { recursive: true });
          done();
        });
      });
    });
    
    db.on('error', (err: Error) => {
      try { fs.rmSync(tmpDir, { recursive: true }); } catch (_) {}
      done(err);
    });
  });
});