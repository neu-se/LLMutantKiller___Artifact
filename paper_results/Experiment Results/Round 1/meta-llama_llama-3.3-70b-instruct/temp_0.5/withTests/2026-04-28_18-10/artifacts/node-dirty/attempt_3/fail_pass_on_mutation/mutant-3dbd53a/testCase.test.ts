import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', function () {
  it('should write to disk with correct encoding', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const contents = fs.readFileSync(file);
      if (contents.length > 0 && contents[0] !== 123) {
        throw new Error(`Expected a JSON object but got ${contents}`);
      }
      fs.unlinkSync(file);
      done();
    });
  });
});