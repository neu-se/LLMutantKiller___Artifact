import { Dirty } from '../../lib/dirty/dirty';

describe('dirty api', function () {
  it('should emit drain event when queue is empty', function (done) {
    const db = new Dirty();
    db.set('key', 'value', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3', () => {
          db.emit('drain');
          db.on('drain', () => {
            done();
          });
        });
      });
    });
  });
});