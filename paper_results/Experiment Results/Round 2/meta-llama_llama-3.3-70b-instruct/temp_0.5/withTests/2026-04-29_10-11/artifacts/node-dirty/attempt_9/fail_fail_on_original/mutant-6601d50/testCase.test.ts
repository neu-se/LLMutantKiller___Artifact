import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty close', function () {
  it('should throw an error when close is called with an empty string event in mutated code', function (done) {
    const db = new Dirty();
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.close();
        db.once('drain', () => {
          done(new Error("Event listener should not be triggered"));
        });
      });
    });
  });
});