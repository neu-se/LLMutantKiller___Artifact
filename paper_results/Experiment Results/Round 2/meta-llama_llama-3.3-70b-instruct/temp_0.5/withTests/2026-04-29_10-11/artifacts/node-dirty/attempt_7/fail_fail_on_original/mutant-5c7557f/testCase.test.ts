import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty api', function () {
  it('should emit drain event when queue is empty', function (done) {
    const file = 'tmp/test.dirty';
    const db = new Dirty(file);
    db.set('key', 'value', () => {
      db.set('key2', 'value2', () => {
        db.on('drain', () => {
          db.set('key3', 'value3', () => {
            db.on('drain', () => {
              db.close();
              done();
            });
          });
        });
      });
    });
  });
});