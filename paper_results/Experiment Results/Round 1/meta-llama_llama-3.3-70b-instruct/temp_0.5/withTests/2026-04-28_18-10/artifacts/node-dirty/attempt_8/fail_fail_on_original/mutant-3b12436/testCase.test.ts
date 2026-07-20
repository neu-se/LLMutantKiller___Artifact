import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from "fs";
import * as assert from "assert";

describe('dirty api', function () {
  it('should not load corrupted data', function (done) {
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
            db2.on('load', (size: number) => {
              assert.strictEqual(size, 1);
              db2.forEach((key: string, val: any) => {
                assert.strictEqual(key, 'key');
                assert.strictEqual(val, 'value');
              });
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