import { Dirty } from '../../../lib/dirty/dirty.js';
import * as fs from 'fs';
import * as path from 'path';
import { rimraf } from 'rimraf';

describe('Dirty database', function () {
  it('should handle empty lines in the database file', function (done) {
    const filePath = 'test.dirty';
    fs.writeFileSync(filePath, '{"key":"x","val":"y"}\n\n{"key":"p","val":"q"}\n');
    const db = new Dirty(filePath);
    db.on('load', (length: number) => {
      assert.strictEqual(length, 2);
      assert.strictEqual(db.get('x'), 'y');
      assert.strictEqual(db.get('p'), 'q');
      rimraf.sync(filePath);
      done();
    });
  });
});