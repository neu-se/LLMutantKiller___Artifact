import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty file encoding', () => {
  it('should correctly load data with multi-byte UTF-8 characters from disk', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-encoding-test-${Date.now()}.dirty`);
    
    // Write a file with multi-byte UTF-8 characters
    const key = 'greeting';
    const val = 'héllo wörld 日本語';
    const row = JSON.stringify({ key, val }) + '\n';
    fs.writeFileSync(file, row, 'utf-8');
    
    const db = new (Dirty as any)(file);
    db.on('load', (length: number) => {
      try {
        expect(length).toBe(1);
        expect(db.get(key)).toBe(val);
        fs.unlinkSync(file);
        done();
      } catch (e) {
        fs.unlinkSync(file);
        done(e);
      }
    });
    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch {}
      done(err);
    });
  });
});