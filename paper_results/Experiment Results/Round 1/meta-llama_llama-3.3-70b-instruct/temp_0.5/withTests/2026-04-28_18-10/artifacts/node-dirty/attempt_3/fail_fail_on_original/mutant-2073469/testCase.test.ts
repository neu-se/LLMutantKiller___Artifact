import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe('Dirty', function () {
  it('should emit "drain" event after write and not emit any other event with the same name', function (done) {
    const db = new Dirty('test.dirty');
    let drainEmitted = false;
    db.on('drain', () => {
      drainEmitted = true;
    });
    db.on('drain', () => {
      throw new Error('Expected "drain" event to be emitted only once');
    });
    db.set('key', 'value');
    setTimeout(() => {
      if (!drainEmitted) {
        throw new Error('Expected "drain" event to be emitted');
      }
      db.close();
      done();
    }, 100);
  });
});