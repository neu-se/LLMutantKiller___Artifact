import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('write stream encoding', () => {
  it('should correctly write and read back data with proper UTF-8 encoding', (done) => {
    const tmpDir = os.tmpdir();
    const file = path.join(tmpDir, `dirty-encoding-test-${Date.now()}.dirty`);
    
    const db = new (Dirty as any)(file);
    
    db.on('load', () => {
      db.set('hello', 'world', (err: Error | null) => {
        if (err) return done(err);
        
        const contents = fs.readFileSync(file, 'utf-8');
        const expected = JSON.stringify({ key: 'hello', val: 'world' }) + '\n';
        
        try {
          expect(contents).toBe(expected);
          fs.unlinkSync(file);
          done();
        } catch (e) {
          fs.unlinkSync(file);
          done(e);
        }
      });
    });
    
    db.on('error', done);
  });
});