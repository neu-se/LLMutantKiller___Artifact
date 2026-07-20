import { Dirty } from '../../lib/dirty/dirty.js';

describe('dirty api', function () {
  it('should emit drain event when queue is empty', function (done) {
    const db = new Dirty();
    db.set('key', 'value');
    db.on('drain', () => {
      db.set('key2', 'value2');
      db.on('drain', () => {
        db.set('key3', 'value3');
        db.on('drain', () => {
          db.close();
          done();
        });
      });
    });
  });
});