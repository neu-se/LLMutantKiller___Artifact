import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty db', () => {
  it('should load data correctly when no corrupted row at the end of the db', (done) => {
    const dbPath = 'test.dirty';
    const db = new Dirty(dbPath);
    fs.writeFileSync(dbPath, '{"key":"x","val":"y"}\n{"key":"p","val":"q"}\n');

    db.on('load', (length) => {
      expect(length).toBe(2);
      expect(db.get('x')).toBe('y');
      expect(db.get('p')).toBe('q');
      fs.unlinkSync(dbPath);
      done();
    });
  });
});