import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', () => {
  it('should not emit drain event when close is called with pending writes', (done) => {
    const db = new Dirty('test.dirty');
    let drainEmitted = false;

    db.on('load', () => {
      db.set('key', 'value', () => {
        db.close();
        db.on('drain', () => {
          drainEmitted = true;
        });
      });
    });

    setTimeout(() => {
      if (drainEmitted) {
        done(new Error('Drain event emitted'));
      } else {
        done();
      }
    }, 100);
  });
});