import { Dirty } from '../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js';
import { rimraf } from 'rimraf';

describe('Dirty', () => {
  it('should not emit drain event when there are in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });
    dirty.set('key', 'value', () => {
      dirty.set('key', 'new value', () => {
        // In the original code, this should not emit 'drain' event
        // In the mutated code, this should emit 'drain' event
        setTimeout(() => {
          if (drainEmitted) {
            done(new Error('Drain event emitted unexpectedly'));
          } else {
            dirty.close();
            done();
          }
        }, 100);
      });
    });
  });

  afterAll(async () => {
    await rimraf('test.db');
  });
});