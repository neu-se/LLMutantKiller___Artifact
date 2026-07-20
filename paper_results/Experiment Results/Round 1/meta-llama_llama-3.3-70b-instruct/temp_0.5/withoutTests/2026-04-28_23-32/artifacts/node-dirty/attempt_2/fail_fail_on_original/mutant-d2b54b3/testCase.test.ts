import { Dirty } from '../dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      done();
    });
    dirty.set('key', 'value', () => {
      // No-op
    });
  });
});