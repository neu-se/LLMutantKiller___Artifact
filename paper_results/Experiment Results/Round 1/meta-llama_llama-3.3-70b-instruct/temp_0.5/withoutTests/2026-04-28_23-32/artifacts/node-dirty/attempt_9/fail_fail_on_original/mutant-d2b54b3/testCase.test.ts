import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    let called = false;
    dirty.on('drain', () => {
      called = true;
    });
    dirty.set('key', 'value', () => {
      dirty.set('key2', 'value2', () => {
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
});