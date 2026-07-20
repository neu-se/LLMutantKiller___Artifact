import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty DB', () => {
  it('should load corrupted rows correctly', (done) => {
    const filePath = 'test.dirty';
    rimraf.sync(filePath);
    fs.writeFileSync(filePath, '{"key":"x"}\n{"key":"y"}\n');

    const db = new Dirty(filePath);
    db.on('load', (length) => {
      assert.strictEqual(length, 2);
      assert.strictEqual(db.get('x'), undefined);
      assert.strictEqual(db.get('y'), undefined);
      done();
    });
  });
});