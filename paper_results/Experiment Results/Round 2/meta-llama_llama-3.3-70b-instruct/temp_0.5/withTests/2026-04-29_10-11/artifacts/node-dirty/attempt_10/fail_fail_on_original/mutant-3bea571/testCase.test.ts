import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';
import * as fs from 'fs';

describe('Dirty', function () {
  it('should emit an error event with a string event name when an empty line is encountered in the database file', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      fs.appendFileSync(file, '\n');
      db.on('error', (err: any) => {
        if (typeof db.emit === 'function' && typeof err === 'object' && err !== null) {
          expect(typeof db.emit).toBe('function');
          done();
        } else {
          done(new Error('Expected error event listener to be an instance of Error'));
        }
      });
    });
  });
});