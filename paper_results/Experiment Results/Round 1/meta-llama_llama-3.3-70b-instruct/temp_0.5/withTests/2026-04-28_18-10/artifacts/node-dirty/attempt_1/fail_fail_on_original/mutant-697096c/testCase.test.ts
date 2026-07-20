import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import * as fs from 'fs';
import * as path from 'path';

describe('Dirty database', () => {
  it('should handle empty lines in the database file', (done) => {
    const filePath = path.join(__dirname, 'test.dirty');
    const db = new Dirty(filePath);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        fs.appendFileSync(filePath, '\n');
        const db2 = new Dirty(filePath);
        db2.on('load', (length) => {
          assert.strictEqual(length, 1);
          assert.strictEqual(db2.get('key'), 'value');
          rimraf.sync(filePath);
          done();
        });
      });
    });
  });
});