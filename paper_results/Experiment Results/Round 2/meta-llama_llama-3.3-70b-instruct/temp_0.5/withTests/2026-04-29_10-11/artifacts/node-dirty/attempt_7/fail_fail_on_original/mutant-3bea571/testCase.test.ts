import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';
import * as fs from 'fs';

describe('Dirty', function () {
  it('should emit an error event with a string event name when an empty line is encountered in the database file', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      fs.appendFileSync(file, '\n');
      const errorListener = (err) => {
        if (typeof err === 'object' && err !== null && 'message' in err) {
          done();
        } else {
          done(new Error('Expected error event listener to be an object with a message property'));
        }
      };
      db.on('error', errorListener);
    });
  });
});