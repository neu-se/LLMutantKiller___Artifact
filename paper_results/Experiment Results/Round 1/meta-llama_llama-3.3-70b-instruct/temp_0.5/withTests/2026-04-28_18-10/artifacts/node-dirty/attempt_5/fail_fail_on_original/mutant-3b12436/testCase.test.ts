import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('dirty api', function () {
  it('should throw an error when a row is missing a key', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        fs.appendFile(file, '{"val":"value"}\n', (err: any) => {
          if (err) {
            done(err);
          } else {
            const db2 = new Dirty(file);
            let size = 0;
            db2.on('load', (s: number) => {
              size = s;
              if (size > 1) {
                assert.fail('Corrupted row was loaded');
              }
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