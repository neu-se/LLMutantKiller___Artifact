import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db', () => {
  it('should load a record whose JSON is split across stream chunk boundaries', (done) => {
    const file = path.join(os.tmpdir(), `dirty-split-${process.pid}-${Date.now()}.dirty`);
    // Use a value that is exactly 65536 - overhead bytes long to force chunk boundary mid-record
    const overhead = '{"key":"k","val":"'.length + '"}\n'.length;
    const valLen = 65536 - overhead;
    const longVal = 'a'.repeat(valLen);
    const content = JSON.stringify({ key: 'k', val: longVal }) + '\n' +
                    JSON.stringify({ key: 'k2', val: 'v2' }) + '\n';
    fs.writeFileSync(file, content, 'utf-8');
    
    const db = new Dirty(file);
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (size: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(size).toBe(2);
        expect(db.get('k')).toBe(longVal);
        expect(db.get('k2')).toBe('v2');
        done();
      } catch (e) { done(e); }
      finally { try { fs.unlinkSync(file); } catch (_) {} }
    });
  });
});