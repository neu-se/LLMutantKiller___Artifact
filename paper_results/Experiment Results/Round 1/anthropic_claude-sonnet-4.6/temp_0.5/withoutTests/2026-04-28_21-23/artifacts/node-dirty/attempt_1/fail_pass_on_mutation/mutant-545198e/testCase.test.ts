import { tmpdir } from 'os';
import { join } from 'path';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty database loading', () => {
  it('should correctly load data from a file with multiple records', (done) => {
    const dbPath = join(tmpdir(), `dirty-test-${Date.now()}.db`);
    
    // Write multiple records to the file
    const records = [
      JSON.stringify({ key: 'foo', val: 'bar' }),
      JSON.stringify({ key: 'baz', val: 42 }),
      JSON.stringify({ key: 'hello', val: { nested: true } }),
    ];
    writeFileSync(dbPath, records.join('\n') + '\n');
    
    const db = new Dirty(dbPath);
    
    db.on('load', (count) => {
      try {
        expect(count).toBe(3);
        expect(db.get('foo')).toBe('bar');
        expect(db.get('baz')).toBe(42);
        expect(db.get('hello')).toEqual({ nested: true });
        
        if (existsSync(dbPath)) unlinkSync(dbPath);
        done();
      } catch (e) {
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