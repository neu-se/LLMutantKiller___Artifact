import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('test-mutation', function () {
  it('should handle file existence correctly', function (done) {
    const file = 'test-mutation.dirty';

    fs.unlinkSync(file);
    const db = new Dirty(file);
    db.on('load', (length) => {
      if (length !== 0) {
        throw new Error('Should not reach here');
      }
      done();
    });

    db.on('error', (err) => {
      throw new Error('Should not reach here');
    });
  });
});