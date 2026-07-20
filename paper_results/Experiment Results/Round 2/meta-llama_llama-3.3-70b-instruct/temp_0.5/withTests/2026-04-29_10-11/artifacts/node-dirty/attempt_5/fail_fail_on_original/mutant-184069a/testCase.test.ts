import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('test-mutation', function () {
  it('should fire error event when file does not exist and is not handled', function (done) {
    const file = 'test-mutation.dirty';

    fs.unlinkSync(file);
    const db = new Dirty(file);
    db.on('load', () => {
      throw new Error('Should not reach here');
    });

    db.on('error', (err) => {
      if (err.code === 'ENOENT') {
        done();
      } else {
        throw new Error('Unexpected error');
      }
    });
  });
});