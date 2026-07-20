import { Dirty } from '../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('emits an error event when a corrupted row is found at the end of the database', (done) => {
    const dirty = new Dirty('test.db');
    let errorEmitted = false;
    dirty.on('error', () => {
      errorEmitted = true;
    });
    dirty.set('key', 'value');
    dirty.set('corrupted row');
    setTimeout(() => {
      expect(errorEmitted).toBe(true);
      done();
    }, 100);
  });
});