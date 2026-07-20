import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', function () {
  it('should write to disk with correct encoding', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'latin1');
      if (contents.includes('\x00')) {
        throw new Error('Invalid encoding');
      }
      fs.unlinkSync(file);
      done();
    });
  });
});