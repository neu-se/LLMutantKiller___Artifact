import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should load all records from a file with trailing newline', (done) => {
    const dbPath = join(tmpdir(), `dirty-mutation-${process.pid}.db`);
    
    writeFileSync(dbPath, 
      JSON.stringify({key: 'name', val: 'Alice'}) + '\n' +
      JSON.stringify({key: 'age', val: 30}) + '\n'
    );
    
    const db = new Dirty(dbPath);
    
    db.on('load', (count) => {
      try {
        expect(count).toBe(2);
        expect(db.get('name')).toBe('Alice');
        expect(db.get('age')).toBe(30);
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch(e) {
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done(e);
      }
    });
    
    db.on('error', (err) => {
      if (existsSync(dbPath)) unlinkSync(dbPath);
      done(err);
    });
  });
});