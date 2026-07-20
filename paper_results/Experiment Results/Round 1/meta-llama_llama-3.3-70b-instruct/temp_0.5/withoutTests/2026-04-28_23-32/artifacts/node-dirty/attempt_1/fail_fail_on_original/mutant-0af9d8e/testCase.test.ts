import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should emit drain event when there are no in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    dirty.on('drain', () => {
      done();
    });
    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        // In the original code, this should emit 'drain' event
        // In the mutated code, this should not emit 'drain' event
      });
    });
  });

  afterAll(async () => {
    await rimraf('test.db');
  });
});