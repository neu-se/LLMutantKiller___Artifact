import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty db', function () {
  it('should write to disk with correct encoding', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);
    db.set('key', '\ud83d\ude00');
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'utf8');
      if (contents !== '{"key":"key","val":"\ud83d\ude00"}\n') {
        throw new Error('Invalid encoding');
      }
      fs.unlinkSync(file);
      done();
    });
  });
});