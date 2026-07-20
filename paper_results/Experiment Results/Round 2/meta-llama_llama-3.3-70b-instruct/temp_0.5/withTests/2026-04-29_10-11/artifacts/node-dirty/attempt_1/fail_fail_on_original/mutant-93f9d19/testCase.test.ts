import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "error" event with a valid string when a corrupted row is found at the end of the db', function (done) {
    const db = new Dirty();
    db.on('error', (err) => {
      expect(err.message).toBe('Corrupted row at the end of the db: ');
      done();
    });
    db._readStream = {
      on: (event, callback) => {
        if (event === 'end') {
          callback();
        }
      },
      emit: (event, data) => {
        if (event === 'end') {
          db._readStream.emit('end');
        }
      }
    };
    db._load();
  });
});