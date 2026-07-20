import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should load data correctly from file', (done) => {
    const db = new Dirty('test.dirty');
    db.set('key', 'value\nwith newline');
    db.on('drain', () => {
      const data = fs.readFileSync('test.dirty', 'utf-8');
      const lines = data.split('\n');
      expect(lines.length).toBe(2);
      expect(lines[0]).toBe(`{"key":"key","val":"value\\nwith newline"}`);
      expect(lines[1]).toBe('');
      db.close();
      fs.unlinkSync('test.dirty');
      done();
    });
  });
});