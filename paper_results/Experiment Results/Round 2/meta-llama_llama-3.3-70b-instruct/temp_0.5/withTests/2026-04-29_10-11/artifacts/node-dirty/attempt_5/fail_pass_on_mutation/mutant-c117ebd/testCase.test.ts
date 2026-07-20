import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk with correct encoding', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key', '€');
    db.on('drain', () => {
      const contents = fs.readFileSync(filePath);
      expect(contents.toString('utf-8')).toBe(`{"key":"key","val":"€"}\n`);
      fs.unlinkSync(filePath);
      done();
    });
  });
});