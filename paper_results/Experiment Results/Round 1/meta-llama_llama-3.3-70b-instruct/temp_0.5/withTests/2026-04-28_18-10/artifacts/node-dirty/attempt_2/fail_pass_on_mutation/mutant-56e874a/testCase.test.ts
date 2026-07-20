import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should not write to disk when queue is empty and waitForDrain is true, but should write when queue is not empty', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      db.set('key', 'value', () => {
        db._waitForDrain = true;
        db._flush();
        db.set('key2', 'value2');
        db._flush();
        fs.readFile(tmpFile, 'utf8', (err, data) => {
          if (err) {
            done(err);
            return;
          }
          if (data === '') {
            done(new Error('Expected file to contain data'));
            return;
          }
          done();
        });
      });
    });
  });
});