import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('dirty api', function () {
  it('should handle corrupted data correctly', function (done) {
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
            db2.on('error', (err: any) => {
              assert.ok(err);
              fs.unlink(file, () => {
                done();
              });
            });
            db2.on('load', (size: number) => {
              assert.fail('Corrupted data was loaded');
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