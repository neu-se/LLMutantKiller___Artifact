import { Dirty } from '../../../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should load data correctly from file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value\nwith newline');
      db.on('drain', () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        expect(lines.length).toBe(2);
        expect(lines[0]).toBe(`{"key":"key","val":"value\\nwith newline"}`);
        expect(lines[1]).toBe('');
        db.close();
        fs.unlinkSync(filePath);
        done();
      });
    });
  });
});