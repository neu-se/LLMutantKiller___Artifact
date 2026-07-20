import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db', () => {
  it('should load a record that spans multiple stream chunks', (done) => {
    const file = path.join(os.tmpdir(), `dirty-test-${process.pid}-${Date.now()}.dirty`);
    // Make a value that's larger than the default 64KB highWaterMark
    // so the record MUST span multiple chunks (none of which end with \n except the last)
    const val = 'x'.repeat(200000);
    const content = JSON.stringify({ key: 'test', val }) + '\n';
    fs.writeFileSync(file, content, 'utf-8');
    
    const db = new Dirty(file);
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (size: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(size).toBe(1);
        expect(db.get('test')).toBe(val);
        done();
      } catch (e) { done(e); }
      finally { try { fs.unlinkSync(file); } catch (_) {} }
    });
  });
});