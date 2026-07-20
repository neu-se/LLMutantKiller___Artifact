import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import { expect } from '@jest/globals';

describe('Dirty database', function () {
  it('should handle empty lines in the database file', function (done) {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);
    db.on('load', (length: number) => {
      expect(length).toBe(2);
      expect(db.get('x')).toBe('y');
      expect(db.get('p')).toBe('q');
      fs.unlinkSync(filePath);
      done();
    });
    db.on('error', (err: any) => {
      expect(err).toBeUndefined();
      done();
    });
  });
});