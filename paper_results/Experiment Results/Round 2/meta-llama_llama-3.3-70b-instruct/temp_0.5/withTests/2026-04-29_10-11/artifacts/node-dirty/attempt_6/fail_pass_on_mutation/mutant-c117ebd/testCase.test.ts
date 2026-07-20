import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty', () => {
  it('should write to disk with correct encoding', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.set('key', '\u{1F600}');
    db.on('drain', () => {
      const contents = fs.readFileSync(filePath);
      const expectedContents = Buffer.from(`{"key":"key","val":"\u{1F600}"}\n`, 'utf-8');
      expect(contents).toEqual(expectedContents);
      fs.unlinkSync(filePath);
      done();
    });
  });
});