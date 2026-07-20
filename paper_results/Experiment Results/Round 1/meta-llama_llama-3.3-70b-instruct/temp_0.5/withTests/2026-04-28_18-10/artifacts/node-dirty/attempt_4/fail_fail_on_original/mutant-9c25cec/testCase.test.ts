import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty DB', () => {
  it('should handle missing key in loaded data', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n{"val":"z"}\n');

    const db = new Dirty(filePath);
    db.on('load', (length) => {
      expect(length).toBe(1);
      expect(db.size()).toBe(1);
      expect(db.get('x')).toBe('y');
      expect(db.get('z')).toBeUndefined();
      fs.unlinkSync(filePath);
      done();
    });
  });
});