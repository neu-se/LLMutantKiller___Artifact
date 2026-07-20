import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";
import { EventEmitter } from 'events';

describe('Dirty', function () {
  it('should emit "error" event with a valid string when a corrupted row is found at the end of the db', function (done) {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      db._readStream = new EventEmitter();
      db._readStream.emit('end', '');
      db.on('error', (err) => {
        expect(err.message).toBe('Corrupted row at the end of the db: ');
        done();
      });
    });
  });
});