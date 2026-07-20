import { Dirty } from '../dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    let called = false;
    dirty.on('drain', () => {
      called = true;
    });
    dirty.set('key', 'value', () => {
      dirty.close();
      setTimeout(() => {
        if (!called) {
          throw new Error('drain event not emitted');
        }
        done();
      }, 100);
    });
  });
});