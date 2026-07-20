import { Dirty } from '../../lib/dirty/dirty.js';

describe('dirty api', function () {
  it('should emit drain event when queue is empty', function (done) {
    const db = new Dirty();
    db.set('key', 'value', () => {
      db.set('key2', 'value2', () => {
        db.set('key3', 'value3', () => {
          db.on('drain', () => {
            db.set('key4', 'value4', () => {
              db.on('drain', () => {
                throw new Error('Drain event should not be emitted');
              });
            });
          });
        });
      });
    });
  });
});