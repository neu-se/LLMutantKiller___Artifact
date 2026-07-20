import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty DB', () => {
  it('should load corrupted rows correctly', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n{"key":"p","val":"q"}\n');

    const db = new Dirty(filePath);
    db.on('load', (length) => {
      expect(length).toBe(2);
      expect(db.get('x')).toBe('y');
      expect(db.get('p')).toBe('q');
      fs.unlinkSync(filePath);
      done();
    });
  });
});