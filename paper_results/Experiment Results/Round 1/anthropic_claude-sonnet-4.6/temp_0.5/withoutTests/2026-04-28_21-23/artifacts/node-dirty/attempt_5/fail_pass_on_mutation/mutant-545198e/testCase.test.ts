import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database', () => {
  it('should not emit error when loading valid data where chunk boundary has no newline', (done) => {
    const dbPath = join(tmpdir(), `dirty-mut-${process.pid}.db`);
    
    // Create data where a chunk boundary might land without a newline
    // causing the mutated code to process buffer with empty strings
    const record = JSON.stringify({key: 'test', val: 'data'}) + '\n';
    writeFileSync(dbPath, record);
    
    const errors: Error[] = [];
    const db = new Dirty(dbPath);
    
    db.on('error', (err) => errors.push(err));
    
    db.on('load', (count) => {
      try {
        expect(errors).toHaveLength(0);
        expect(count).toBe(1);
        expect(db.get('test')).toBe('data');
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch(e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e);
      }
    });
  });
});