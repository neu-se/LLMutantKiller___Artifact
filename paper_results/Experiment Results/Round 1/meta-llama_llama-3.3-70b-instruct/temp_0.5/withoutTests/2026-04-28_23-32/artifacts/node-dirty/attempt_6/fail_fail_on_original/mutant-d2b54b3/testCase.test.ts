import { Dirty } from '../../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    let count = 0;
    dirty.on('drain', () => {
      count++;
      if (count === 2) {
        done();
      }
    });
    dirty.set('key', 'value');
    dirty.set('key2', 'value2');
    dirty.close();
  });
});