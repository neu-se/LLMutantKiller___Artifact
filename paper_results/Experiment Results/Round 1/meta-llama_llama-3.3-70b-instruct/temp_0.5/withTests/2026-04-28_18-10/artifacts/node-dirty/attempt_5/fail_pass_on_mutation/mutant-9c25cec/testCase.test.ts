import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty DB', () => {
  it('should handle missing key in loaded data', (done) => {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n{"key":"z","val":"w"}\n');

    const db = new Dirty(filePath);
    db.on('load', (length) => {
      expect(length).toBe(2);
      expect(db.size()).toBe(2);
      expect(db.get('x')).toBe('y');
      expect(db.get('z')).toBe('w');
      fs.unlinkSync(filePath);
      done();
    });
    db.on('error', (err) => {
      expect(err.message).not.toContain('Could not load corrupted row');
      done();
    });
  });
});