import fs from 'fs';
import path from 'path';
import Dirty from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty corrupted row handling', () => {
  it('should emit exactly one error for one corrupted row and correctly load surrounding valid rows', (done) => {
    const file = path.join(__dirname, 'test-mutation-detect.dirty');
    if (fs.existsSync(file)) fs.unlinkSync(file);
    fs.writeFileSync(file, '{"key":"a","val":1}\nBAD\n{"key":"b","val":2}\n');
    const db = new Dirty(file);
    const errors: Error[] = [];
    db.on('error', (err: Error) => errors.push(err));
    db.on('load', (size: number) => {
      if (fs.existsSync(file)) fs.unlinkSync(file);
      expect(errors.length).toBe(1);
      expect(size).toBe(2);
      done();
    });
  });
});