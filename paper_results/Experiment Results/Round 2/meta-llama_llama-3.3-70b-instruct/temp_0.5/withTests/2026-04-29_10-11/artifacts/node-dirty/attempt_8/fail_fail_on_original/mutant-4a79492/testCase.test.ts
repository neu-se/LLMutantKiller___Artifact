import { Dirty } from '../../../../../lib/dirty/dirty.js';

describe('dirty', () => {
  it('should emit drain event when queue is empty', (done) => {
    const db = new Dirty();
    db.set('key', 'value');
    db.on('drain', () => {
      db.set('key2', 'value2', () => {
        db.on('drain', () => {
          done();
        });
      });
    });
  });
});