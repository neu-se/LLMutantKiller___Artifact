import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty - corrupted row handling', () => {
  it('should continue processing valid rows after a corrupted row in the same chunk', (done) => {
    const tmpDir = os.tmpdir();
    const dbPath = path.join(tmpDir, `test-dirty-${Date.now()}.db`);
    
    // Write a db file with a corrupted row followed by valid rows
    const content = '{"key":"valid1","val":"value1"}\ncorrupted_row\n{"key":"valid2","val":"value2"}\n';
    fs.writeFileSync(dbPath, content, 'utf-8');
    
    const db = new Dirty(dbPath);
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (count: number) => {
      try {
        expect(db.get('valid1')).toBe('value1');
        expect(db.get('valid2')).toBe('value2');
        expect(errors.length).toBe(1);
        done();
      } catch (e) {
        done(e);
      } finally {
        fs.unlinkSync(dbPath);
      }
    });
  });
});