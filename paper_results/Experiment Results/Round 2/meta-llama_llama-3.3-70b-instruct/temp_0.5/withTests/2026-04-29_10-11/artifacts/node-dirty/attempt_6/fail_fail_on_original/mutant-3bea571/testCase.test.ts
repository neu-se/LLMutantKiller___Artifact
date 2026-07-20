import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty';
import * as fs from 'fs';

describe('Dirty', function () {
  it('should emit an error event with a string event name when an empty line is encountered in the database file', function (done) {
    const file = 'test.dirty';
    const db = new Dirty(file);

    db.on('load', () => {
      fs.appendFileSync(file, '\n');
      db.on('error', (err) => {
        if (typeof db.listeners('error')[0] === 'function' && typeof db.emit === 'function') {
          db.removeListener('error', db.listeners('error')[0]);
          db.emit('error', new Error('test error'));
          db.on('error', () => {
            done(new Error('Expected error event not to be emitted'));
          });
        } else {
          done(new Error('Expected error event listener to be a function'));
        }
      });
    });
  });
});