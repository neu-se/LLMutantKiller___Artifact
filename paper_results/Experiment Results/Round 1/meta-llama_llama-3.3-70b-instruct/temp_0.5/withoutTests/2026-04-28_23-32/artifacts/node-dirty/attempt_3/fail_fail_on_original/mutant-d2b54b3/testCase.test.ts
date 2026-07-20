import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';

describe('Dirty', () => {
  it('should emit drain event when all writes are completed', (done) => {
    const dirty = new Dirty('test.db');
    let drainCount = 0;
    dirty.on('drain', () => {
      drainCount++;
      if (drainCount === 2) {
        done();
      }
    });
    dirty.set('key1', 'value1', () => {
      dirty.set('key2', 'value2', () => {
        // No-op
      });
    });
  });
});