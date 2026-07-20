import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty db', () => {
  it('should load data from file with lines spanning chunk boundaries', (done) => {
    const file = path.join(os.tmpdir(), `dirty-boundary-${process.pid}-${Date.now()}.dirty`);
    
    // Create a file with a very long line (>64KB) to force chunk without newline
    const longVal = 'x'.repeat(70000);
    const content = JSON.stringify({ key: 'longkey', val: longVal }) + '\n' +
                    JSON.stringify({ key: 'short', val: 'value' }) + '\n';
    
    fs.writeFileSync(file, content, 'utf-8');
    
    const db = new Dirty(file);
    const errors: Error[] = [];
    
    db.on('error', (err: Error) => errors.push(err));
    
    db.on('load', (size: number) => {
      try {
        expect(errors).toHaveLength(0);
        expect(size).toBe(2);
        expect(db.get('longkey')).toBe(longVal);
        expect(db.get('short')).toBe('value');
        done();
      } catch (e) {
        done(e);
      } finally {
        try { fs.unlinkSync(file); } catch (_) {}
      }
    });
  });
});