import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk with correct encoding', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key', 'value');
    db.on('drain', () => {
      const contents = fs.readFileSync(filePath, 'utf-8');
      expect(contents).toBe(`{"key":"key","val":"value"}\n`);
      fs.unlinkSync(filePath);
      done();
    });
  });
});