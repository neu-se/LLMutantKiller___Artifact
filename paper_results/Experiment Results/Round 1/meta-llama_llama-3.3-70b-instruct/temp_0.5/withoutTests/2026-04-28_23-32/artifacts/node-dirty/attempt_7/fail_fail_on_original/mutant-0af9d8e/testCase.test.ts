import { Dirty } from '../dirty.js';

describe('Dirty', () => {
  it('should emit drain event when there are no in-flight writes', (done) => {
    const dirty = new Dirty('test.db');
    let drainEmitted = false;
    dirty.on('drain', () => {
      drainEmitted = true;
    });
    dirty.set('key', 'value', () => {
      dirty.set('key', undefined, () => {
        // In the original code, this should emit 'drain' event
        // In the mutated code, this should not emit 'drain' event
        setTimeout(() => {
          if (!drainEmitted) {
            done(new Error('Drain event not emitted'));
          } else {
            dirty.close();
            done();
          }
        }, 100);
      });
    });
  });

  afterAll(() => {
    // Remove the test file
    import('fs').then(fs => {
      fs.unlink('test.db', () => {});
    });
  });
});