import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should handle data correctly', (done) => {
    const filePath = 'test.dirty';
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        const data = fs.readFileSync(filePath, 'utf-8');
        expect(data).toContain('{"key":"key","val":"value"}');
        expect(data).toContain('\n');
        done();
      });
    });
  });
});