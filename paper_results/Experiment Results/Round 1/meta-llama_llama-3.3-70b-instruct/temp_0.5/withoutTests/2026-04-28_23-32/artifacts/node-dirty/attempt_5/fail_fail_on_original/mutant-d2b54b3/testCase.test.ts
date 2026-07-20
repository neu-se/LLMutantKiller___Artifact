import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      dirty.close();
      done();
    });
    dirty.set('key', 'value');
    dirty.set('key2', 'value2');
  });
});