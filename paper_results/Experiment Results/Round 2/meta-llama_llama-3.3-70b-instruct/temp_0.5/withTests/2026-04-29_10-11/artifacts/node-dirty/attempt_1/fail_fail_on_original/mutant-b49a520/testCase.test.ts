import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle newline characters correctly', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value with newline\ncharacter');
      db.on('drain', () => {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');
        expect(lines.length).toBe(2);
        expect(lines[0]).toBe('{"key":"key","val":"value with newline\\ncharacter"}');
        expect(lines[1]).toBe('');
        done();
      });
    });
  });
});