import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('dirty', function () {
  it('should emit drain event when queue is empty after writing', function (done) {
    const db = new Dirty('test.dirty');
    db.on('load', () => {
      db.set('key', 'value');
      db.on('drain', () => {
        db.set('key2', 'value2');
        db.on('drain', () => {
          done();
        });
      });
    });
  });
});