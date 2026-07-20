import { Dirty } from '../../../lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      done();
    });
    dirty.set('key', 'value', () => {
      dirty.close();
    });
  });
});