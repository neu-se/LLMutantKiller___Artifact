import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('Dirty createReadStream encoding', () => {
  it('should correctly read large data with multi-byte UTF-8 characters across chunk boundaries', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-large-test-${process.pid}.dirty`);

    // Write enough data to exceed the default 64KB highWaterMark
    // Use multi-byte UTF-8 characters (€ = 3 bytes each) to ensure
    // characters get split across chunk boundaries
    // Each row: {"key":"N","val":"€€€...€"}\n
    
    const euroSign = '\u20AC'; // 3 bytes in UTF-8
    // Make a value with many euro signs - enough to push total file size > 64KB
    const val = euroSign.repeat(5000); // 5000 * 3 = 15000 bytes per row
    // 5 rows = 75000 bytes > 64KB default highWaterMark
    
    let fileContent = '';
    for (let i = 0; i < 5; i++) {
      fileContent += JSON.stringify({ key: `key${i}`, val }) + '\n';
    }
    
    fs.writeFileSync(file, fileContent, 'utf-8');
    
    const db = new Dirty(file);
    
    db.on('load', (length: number) => {
      try {
        expect(length).toBe(5);
        for (let i = 0; i < 5; i++) {
          expect(db.get(`key${i}`)).toBe(val);
        }
        try { fs.unlinkSync(file); } catch {}
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch {}
        done(e);
      }
    });
    
    db.on('error', (err: Error) => {
      try { fs.unlinkSync(file); } catch {}
      done(err);
    });
  });
});