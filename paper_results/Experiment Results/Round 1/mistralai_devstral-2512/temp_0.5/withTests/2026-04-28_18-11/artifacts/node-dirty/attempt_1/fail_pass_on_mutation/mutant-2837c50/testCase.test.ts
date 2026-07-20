import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('close method behavior', () => {
  it('should emit write_close event after closing with pending writes', (done) => {
    const testFile = path.join(__dirname, 'test-close.dirty');
    rimraf.sync(testFile);

    const db = new Dirty(testFile);
    db.on('load', () => {
      db.set('key1', 'value1');
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.close();
      });
    });

    db.on('write_close', () => {
      done();
    });
  });
});