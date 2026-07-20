import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('test-encoding', function () {
  it('should write to disk with correct encoding', function (done) {
    const file = 'test-encoding.dirty';
    const db = new Dirty(file);
    db.set('key', 'value');
    db.on('drain', () => {
      const contents = fs.readFileSync(file, 'utf-8');
      assert.strictEqual(
          contents,
          `${JSON.stringify({key: 'key', val: 'value'})}\n`
      );
      fs.unlinkSync(file);
      done();
    });
  });
});