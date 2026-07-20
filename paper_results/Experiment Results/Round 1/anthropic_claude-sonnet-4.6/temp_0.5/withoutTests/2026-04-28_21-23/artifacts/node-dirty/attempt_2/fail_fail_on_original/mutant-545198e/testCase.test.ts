import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading with partial chunks', () => {
  it('should emit error for empty lines when processing chunks without newlines in mutated code', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${Date.now()}.db`);
    
    // Create a file where the last line has no trailing newline
    // This tests behavior when buffer has content but chunk has no newline
    const content = JSON.stringify({ key: 'key1', val: 'val1' }) + '\n' + JSON.stringify({ key: 'key2', val: 'val2' });
    writeFileSync(dbPath, content);
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err) => {
      errors.push(err);
    });
    
    db.on('load', (count) => {
      try {
        expect(count).toBe(2);
        expect(db.get('key1')).toBe('val1');
        expect(db.get('key2')).toBe('val2');
        expect(errors).toHaveLength(0);
        
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch (e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e);
      }
    });
  });
});