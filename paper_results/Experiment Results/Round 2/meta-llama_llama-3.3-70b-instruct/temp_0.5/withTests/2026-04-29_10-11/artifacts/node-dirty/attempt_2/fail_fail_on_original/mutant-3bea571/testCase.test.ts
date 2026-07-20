import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';
import { fs } from 'fs';

describe('Dirty', function () {
  it('should emit an error event with a string event name when an empty line is encountered in the database file', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      fs.appendFileSync(file, '\n');
      db.on('error', (err) => {
        if (err.message === 'Empty lines never appear in a healthy database') {
          done();
        } else {
          done(new Error('Expected error event with string name "error" but got something else'));
        }
      });
    });
  });
});