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
      expect(Buffer.from(contents).toString('hex')).toEqual(Buffer.from(`{"key":"key","val":"value"}\n`, 'utf-8').toString('hex'));
      fs.unlinkSync(filePath);
      done();
    });
  });
});