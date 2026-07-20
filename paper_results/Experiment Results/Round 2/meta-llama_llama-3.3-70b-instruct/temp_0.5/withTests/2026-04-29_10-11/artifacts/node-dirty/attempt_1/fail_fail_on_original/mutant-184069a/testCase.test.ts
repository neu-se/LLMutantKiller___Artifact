import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { rimraf } from 'rimraf';
import * as fs from 'fs';

describe('test-mutation', function () {
  it('should fire error event on read error', function (done) {
    const file = 'test-mutation.dirty';
    rimraf.sync(file);
    fs.writeFileSync(file, 'invalid json');

    const db = new Dirty(file);
    db.on('error', (err) => {
      assert.ok(err);
      done();
    });
  });
});