// <Jest test file containing exactly one test case>
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty unicode loading', () => {
  it('should correctly load unicode data from disk', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-unicode-test-${Date.now()}.dirty`);
    
    // Clean up before test
    try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
    
    const unicodeValue = '日本語テスト🎉 café naïve résumé';
    
    const db1 = new Dirty(file);
    db1.on('load', () => {
      db1.set('unicode_key', unicodeValue, () => {
        db1.close();
        db1.on('write_close', () => {
          // Now reload from disk
          const db2 = new Dirty(file);
          db2.on('load', (length: number) => {
            try {
              expect(length).toBe(1);
              expect(db2.get('unicode_key')).toBe(unicodeValue);
              // Clean up
              try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
              done();
            } catch (err) {
              try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
              done(err);
            }
          });
          db2.on('error', (err: Error) => {
            try { fs.unlinkSync(file); } catch (e) { /* ignore */ }
            done(err);
          });
        });
      });
    });
  });
});