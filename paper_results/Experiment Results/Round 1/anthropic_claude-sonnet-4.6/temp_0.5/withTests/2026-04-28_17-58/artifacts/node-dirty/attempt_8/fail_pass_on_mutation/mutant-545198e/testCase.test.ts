import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const Dirty = require('../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js');

describe('dirty', () => {
  it('should emit error for empty lines when processing chunks without newlines triggers buffer split', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `test-dirty-empty-${process.pid}.dirty`);
    
    // Write file where after processing chunk1 (has \n), buffer=""
    // Then chunk2 arrives with no \n but buffer was previously "row\n" 
    // This tests the specific path where buffer ends with \n
    // Original: chunk has no \n -> return early (no split)
    // Mutated: always split -> may produce empty string -> emit error
    
    // To get buffer="something\n" when chunk has no \n:
    // We need buffer to end with \n before chunk += buffer
    // But buffer never ends with \n after processing...
    
    // Actually: what if we write a file where chunk boundary is AFTER \n?
    // chunk1 = "row1\n" -> processed, buffer=""
    // chunk2 = "row2" (no \n) -> buffer="row2"
    // Original: return early
    // Mutated: split ["row2"], pop -> buffer="row2", arr=[] -> nothing
    // end: buffer="row2" -> error in both
    
    fs.writeFileSync(file, '{"key":"a","val":1}\n', 'utf-8');
    
    const errors: Error[] = [];
    const db = new Dirty(file);
    
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (length: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(length).toBe(1);
        expect(db.get('a')).toBe(1);
        fs.unlinkSync(file);
        done();
      } catch (e) {
        try { fs.unlinkSync(file); } catch (_) {}
        done(e);
      }
    });
  });
});