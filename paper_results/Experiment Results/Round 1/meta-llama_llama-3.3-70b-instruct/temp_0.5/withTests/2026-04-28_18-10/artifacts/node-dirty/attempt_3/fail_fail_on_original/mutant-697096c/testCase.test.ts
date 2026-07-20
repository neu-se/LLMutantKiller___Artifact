import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database', () => {
  it('should handle empty lines in the database file', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);

    db.on('load', (length) => {
      assert.strictEqual(length, 2);
      assert.strictEqual(db.get('x'), 'y');
      assert.strictEqual(db.get('p'), 'q');
      fs.unlinkSync(filePath);
      done();
    });
  });
});