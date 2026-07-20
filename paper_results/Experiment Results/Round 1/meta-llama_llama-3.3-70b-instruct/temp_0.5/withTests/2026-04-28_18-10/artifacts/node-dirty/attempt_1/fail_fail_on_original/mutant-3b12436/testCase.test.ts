import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { fs } from "fs";
import { assert } from "assert";

describe('dirty api', function () {
  it('should throw an error when a row is missing a key', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        fs.appendFile(file, '{"val":"value"}\n', (err) => {
          if (err) {
            done(err);
          } else {
            const db2 = new Dirty(file);
            db2.on('error', (err) => {
              assert.ok(err);
              fs.unlink(file, () => {
                done();
              });
            });
          }
        });
      });
    });
  });
});