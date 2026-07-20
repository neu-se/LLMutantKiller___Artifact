import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';
import * as path from 'path';

describe('dirty', function () {
  it('should not write to disk when _flush is called with an empty queue', function (done) {
    const tmpFile = path.join(__dirname, 'tmp.dirty');
    fs.unlinkSync(tmpFile);
    const db = new Dirty(tmpFile);
    db.on('load', () => {
      db._flush();
      fs.readFile(tmpFile, 'utf8', (err, data) => {
        if (err) {
          done(err);
          return;
        }
        if (data !== '') {
          done(new Error('Expected file to be empty'));
          return;
        }
        done();
      });
    });
  });
});