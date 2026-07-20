import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import { expect } from '@jest/globals';

describe('Dirty database', () => {
  it('should handle empty lines in the database file', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n\n{"key":"p","val":"q"}');
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