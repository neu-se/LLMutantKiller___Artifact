import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';
import * as rimraf from 'rimraf';

describe('Dirty db', function () {
  it('should flush after write to disk', function (done) {
    const file = 'test.dirty';
    rimraf.sync(file);
    const db = new Dirty(file);
    db.set('foo', 'bar');
    db.on('drain', () => {
      db.set('foo2', 'bar2');
      db.on('drain', () => {
        const contents = fs.readFileSync(file, 'utf-8');
        const expectedContents = `${JSON.stringify({key: 'foo', val: 'bar'})}\n${JSON.stringify({key: 'foo2', val: 'bar2'})}\n`;
        if (contents !== expectedContents) {
          throw new Error(`Expected contents to be ${expectedContents}, but got ${contents}`);
        }
        rimraf.sync(file);
        done();
      });
    });
  });
});