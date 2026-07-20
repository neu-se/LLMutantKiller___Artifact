import { createWriteStream, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row handling', () => {
  it('should emit error for corrupted row and continue processing valid rows after it', (done) => {
    const file = join(__dirname, 'test-corrupted.dirty');
    if (existsSync(file)) unlinkSync(file);
    
    const ws = createWriteStream(file, { encoding: 'utf-8' });
    ws.write('{"key":"valid1","val":"value1"}\n');
    ws.write('CORRUPTED_ROW\n');
    ws.write('{"key":"valid2","val":"value2"}\n');
    ws.end(() => {
      const db = new (Dirty as any)(file);
      const errors: Error[] = [];
      db.on('error', (err: Error) => errors.push(err));
      db.on('load', (size: number) => {
        if (existsSync(file)) unlinkSync(file);
        expect(errors.length).toBe(1);
        expect(db.get('valid1')).toBe('value1');
        expect(db.get('valid2')).toBe('value2');
        done();
      });
    });
  });
});