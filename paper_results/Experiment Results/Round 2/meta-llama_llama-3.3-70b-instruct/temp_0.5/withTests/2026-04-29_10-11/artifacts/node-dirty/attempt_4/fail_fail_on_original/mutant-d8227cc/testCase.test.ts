import { Dirty } from '../../../../lib/dirty/dirty.js';
import * as fs from 'fs';

describe('Dirty', () => {
  it('should load data correctly from file', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.set('key2', 'value2\nwith newline');
      db.on('drain', () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        expect(lines.length).toBe(3);
        expect(lines[0]).toBe(`{"key":"key","val":"value"}`);
        expect(lines[1]).toBe(`{"key":"key2","val":"value2\\nwith newline"}`);
        expect(lines[2]).toBe('');
        db.close();
        fs.unlinkSync(filePath);
        done();
      });
    });
  });
});