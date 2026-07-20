import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('test-mutation', function () {
  it('should handle ENOENT error correctly', function (done) {
    const file = 'test-mutation.dirty';

    fs.unlinkSync(file);
    const db = new Dirty(file);
    db.on('load', (length) => {
      done();
    });

    db.on('error', (err) => {
      if (err.code === 'ENOENT') {
        throw new Error('Should not reach here');
      }
    });
  });
});