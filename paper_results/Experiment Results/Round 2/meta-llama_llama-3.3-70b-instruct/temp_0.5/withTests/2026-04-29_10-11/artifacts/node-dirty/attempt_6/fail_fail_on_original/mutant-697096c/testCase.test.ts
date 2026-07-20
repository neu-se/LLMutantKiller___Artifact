import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('Dirty database', function () {
  it('should handle empty lines in the database file', function (done) {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);
    db.on('load', (length: number) => {
      assert.strictEqual(length, 2);
      assert.strictEqual(db.get('x'), 'y');
      assert.strictEqual(db.get('p'), 'q');
      fs.unlinkSync(filePath);
      done();
    });
    db.on('error', (err: any) => {
      assert.fail('Should not emit error event');
      done();
    });
  });
});