import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle newline characters', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        const data = fs.readFileSync(filePath, 'utf-8');
        expect(data).not.toContain('undefined');
        expect(data.split('\n').length).toBe(2);
        done();
      });
    });
  });
});