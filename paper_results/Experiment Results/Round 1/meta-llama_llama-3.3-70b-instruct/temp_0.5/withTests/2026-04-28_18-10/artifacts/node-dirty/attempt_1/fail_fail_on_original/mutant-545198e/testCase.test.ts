import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty', () => {
  it('should load data from file', (done) => {
    const tmpPath = path.join(__dirname, 'tmp');
    const filePath = path.join(tmpPath, 'test.dirty');
    rimraf.sync(tmpPath);
    fs.mkdirSync(tmpPath);

    const db = new Dirty(filePath);
    db.set('key', 'value');
    db.on('drain', () => {
      db.close();
      const db2 = new Dirty(filePath);
      db2.on('load', (length) => {
        assert.strictEqual(length, 1);
        assert.strictEqual(db2.get('key'), 'value');
        rimraf.sync(tmpPath);
        done();
      });
    });
  });
});