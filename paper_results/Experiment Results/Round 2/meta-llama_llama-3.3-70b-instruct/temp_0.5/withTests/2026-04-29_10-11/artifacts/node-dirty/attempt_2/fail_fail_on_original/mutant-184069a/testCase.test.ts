import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import * as fs from 'fs';

describe('test-mutation', function () {
  it('should not fire load event when file does not exist', function (done) {
    const file = 'test-mutation.dirty';

    const db = new Dirty(file);
    db.on('load', (length) => {
      assert.fail('load event should not be fired');
    });

    db.on('error', (err) => {
      if (err.code === 'ENOENT') {
        done();
      } else {
        assert.fail('Unexpected error');
      }
    });
  });
});